/**
 * This class downloads a file.
 *
 * @class
 * @constructor
 */
var Downloader = function(){};

/**
 * Create a temprary file.
 *
 * @public
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
 * Rename a file.
 *
 * @public
 * @method
 * @param  {string} src  - A path source
 * @param  {string} dest - A path of destination
 */
Downloader.prototype.renameFile = function(src, dest) {
  var fs   = new ActiveXObject('Scripting.FileSystemObject');
  fs.MoveFile(src, dest);
};
