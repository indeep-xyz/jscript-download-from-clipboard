/**
 * Create a path to write a file.
 *
 * @public
 * @method
 * @param  [string] url        - An URL for the downloading
 * @param  [string] tempSuffix - A local path for the temporary file at downloading
 * @return [string] A local path for the output file
 */
Downloader.prototype.createOutputPath = function(url, tempSuffix) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in Downloader#createOutputPath

  /**
   * Create an unique filename.
   *
   * @private
   * @method
   * @param  {string} url - The source for a filename
   * @return {string} A filename
   */
  function createFilename(url) {
    var filename = createBaseFilename(url);

    if (doesExist(filename)) {
      filename = createFilenameNumbered(filename);
    }

    return filename;
  }

  /**
   * Create a filename from an URL.
   *
   * @private
   * @method
   * @param  {string} url - The source for a filename
   * @return {string} A filename
   */
  function createBaseFilename(url) {
    var filename = url.replace(/^.+\/([^\?]+).*/, '$1');

    if (filename.length < 1) {
      filename = 'downloaded_from_clipboard';
    }
    else {
      filename = decodeURI(filename);
      filename = filename.replace(/[\\\/\?\*\|:<>"]/g, '_');
    }

    return filename;
  }

  /**
   * Create a filename which has an unique number.
   *
   * @private
   * @method
   * @param  {string} filename - A filename
   * @return {string} An unique filename in the directory for writing
   */
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

  /**
   * Check whether a file exists or not.
   *
   * @private
   * @method
   * @param  {string} path - A file path
   * @return {string} True when the file exists, false when the file does not exist
   */
  function doesExist(path) {
    var fs = new ActiveXObject('Scripting.FileSystemObject');
    return fs.FileExists(path);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in Downloader#createOutputPath

  var path = '';

  if (url.length > 0) {
    path = createFilename(url);
  }

  return path;
};
