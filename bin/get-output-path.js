function getOutputPath(url) {

  function create(url) {

    var result = createBase(url);

    if (exists(result)) {
      result = createFilenameNumbered(result);
    }

    return result;
  }

  function createBase(url) {

    var filename = url.replace(/^.+\//, '');
    filename = decodeURI(filename);

    // if empty or anomaly filename
    // - set default name
    if (filename.length < 1 || !(/\//.test(url))) {
      filename = 'downloaded_from_clipboard';
    }

    // normalize for Windows
    filename = filename.replace(/[\\\/\?\*\|:<>"]/g, '_');

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
  // - getOutputPath()

  var path = '';

  if (url.length > 0) {
    path = create(url);
  }

  return path;
}
