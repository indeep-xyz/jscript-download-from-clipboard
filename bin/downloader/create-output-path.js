/**
 * Create a path to write a file.
 *
 * @method
 * @param  [string] url        - An URL for the downloading
 * @param  [string] tempSuffix - A local path for the temporary file at downloading
 * @return [string] A local path for the output file
 */
Downloader.prototype.createOutputPath = function(url, tempSuffix) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in Downloader#createOutputPath

  function create(url) {
    var filename = createBaseFilename(url);

    if (doesExist(filename)) {
      filename = createFilenameNumbered(filename);
    }

    return filename;
  }

  function createBaseFilename(url) {
    var filename = url.replace(/^.+\//, '');

    if (filename.length < 1) {
      filename = 'downloaded_from_clipboard';
    }
    else {
      filename = decodeURI(filename);
      filename = filename.replace(/[\\\/\?\*\|:<>"]/g, '_');
    }

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

      if (!doesExist(temp) && !doesExist(temp + tempSuffix)) {
        return temp;
      }
    }

    WScript.Echo('could not saved ' + filename + '.');
    return '';
  }

  function doesExist(filename) {
    var fs = new ActiveXObject('Scripting.FileSystemObject');
    return fs.FileExists(filename);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in Downloader#createOutputPath

  var path = '';

  if (url.length > 0) {
    path = create(url);
  }

  return path;
}
