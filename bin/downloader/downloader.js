/**
 * A class to download a file.
 *
 * @class
 */
var Downloader = function(){};

/**
 * Create a temprary file.
 *
 * @method
 * @param  {string} path - A path for a temporary file
 */
Downloader.prototype.createTempFile = function(path) {
  var FOR_WRITING    = 2;
  var TRISTATE_FALSE = 0;
  var fs   = new ActiveXObject('Scripting.FileSystemObject');
  var file = fs.CreateTextFile(path, FOR_WRITING, TRISTATE_FALSE);

  file.close();
};

/**
 * Raise an error message for writing.
 *
 * @method
 * @param  {string} url        - An URL for downloading
 * @param  {string} tempPath   - A path for a temporary file
 * @param  {string} outputPath - A path which you tried to write a file
 */
Downloader.prototype.raiseError = function(url, tempPath, outputPath){
  WScript.Echo(
      "error occurred while downloading or saving file.\n\n" +
      "url:\n"        + url + "\n\n" +
      "tempPath:\n"   + tempPath   + "\n\n" +
      "outputPath:\n" + outputPath
      );
};

/**
 * Rename a file.
 *
 * @param  {string} src  - A path source
 * @param  {string} dest - A path of destination
 */
Downloader.prototype.renameFile = function(src, dest) {
  var fs   = new ActiveXObject('Scripting.FileSystemObject');
  fs.MoveFile(src, dest);
};
