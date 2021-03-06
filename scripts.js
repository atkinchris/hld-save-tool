function process() {
  var original = document.getElementById('original').files;
  var target = document.getElementById('target').files;
  var magicString = 'eyAibWF';

  readFirstFile(original, function(result) {
    readFirstFile(target, processContents.bind(null, result));
  });

  function processContents(o, t) {
    if (!o || !t) throw new Error('Save data not found');

    var data = o.slice(o.indexOf(magicString), o.length);
    var secret = t.slice(0, t.indexOf(magicString));

    saveData(secret + '' + data, 'HyperLight_RecordOfTheDrifter_0.sav');
  }

  function readFirstFile(files, callback) {
    if (files.length > 0 && files[0]) {
      var reader = new FileReader();
      reader.addEventListener
      reader.onload = function(e) {
        callback(e.target.result);
      }
      reader.readAsText(files[0]);
    } else {
      throw new Error('No files found');
    }
  }

  var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      var blob = new Blob([data]);
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());
}
