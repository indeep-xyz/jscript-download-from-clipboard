/**
 * This class supports to load a JavaScript as option.
 *
 * @class
 * @constructor
 */
function OptionLoader() {}

/**
 * @public
 * @static
 * @var  {string} The defalut value of a directory
 */
OptionLoader.defaultDir = (function(){
  return WScript.ScriptFullName.replace(/(^.+)[\\\/].+$/, '$1');
})();

/**
 * Load and eval a JavaScript file as option.
 *
 * @public
 * @static
 * @method
 * @param  {string} filename - A file name
 * @param  {string} dir      - A directory path
 */
OptionLoader.load = function(filename, dir) {
  var script = OptionLoader.read(filename, dir);
  var options = {};

  if (typeof script === 'string') {
    /* jshint evil:true */
    eval(script);
    /* jshint evil:false */
  }

  return options;
};

/**
 * Load a file.
 *
 * @public
 * @static
 * @method
 * @param  {string} filename - A file name
 * @param  {string} dir      - A directory path
 * @return {string} Text in a file
 * @return {null} The file does not exist
 */
OptionLoader.read = function(filename, dir) {
  dir = dir || OptionLoader.defaultDir;

  var fso = WScript.CreateObject("Scripting.FileSystemObject");
  var path = dir + '/' + filename;
  var content = null;

  if (fso.FileExists(path)) {
    content = fso.OpenTextFile(path, 1).ReadAll();
  }

  return content;
};