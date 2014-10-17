function getOutputPath(url) {

  function createOutputPath(url) {

    function createBase(url) {

      var filename = url.replace(/^.+\//, '');

      // if empty or anomaly filename
      // - set default name
      if (filename.length < 1 || !(/\//.test(url))) {
        filename = 'downloaded';
      }

      // normalize for Windows
      filename = filename.replace(/[\\\/\?\*\|:<>]"/g, '_');

      return filename;
    }

    function createFilenameNumbered(filename) {

      var basename = filename;
      var ext      = '';

      if (/^(.+)(\..+)$/.exec(filename)) {
        basename = RegExp.$1;
        ext      = RegExp.$2;
      }

      for(var i = 1; i++; i < 10000) {
        var temp = basename + ' (' + i + ')' + ext;

        if (!exists(temp)) {
          return temp;
        }
      }

      WScript.Echo('could not saved ' + filename + '.');
      return '';
    }

    function exists(filename) {
      var fs = new ActiveXObject('Scripting.FileSystemObject');
      return fs.FileExists(filename);
    }

    // - - - - - - - - - - - - - - - - - - - - - -
    // main
    // - createOutputPath()

    var filename = createBase(url);

    if (exists(filename)) {
      filename = createFilenameNumbered(filename);
    }

    return filename;
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main
  // - getOutputPath()

  var path = (url.length > 0)
      ? createOutputPath(url)
      : '';

  return path;
}
