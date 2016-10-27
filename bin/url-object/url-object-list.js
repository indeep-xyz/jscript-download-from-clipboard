/**
 * Manage a list of UrlObject.
 *
 * @class
 * @constructor
 * @param  {string} source - Text for URLs
 */
function UrlObjectList(source) {
  this.source = source || UrlObjectList.defaultSource;
  this.list = UrlObjectList.creteList(this.source);
}

/**
 * @public
 * @static
* @var {string} Text in clipboard
 */
UrlObjectList.defaultSource = (function(){
  var html = new ActiveXObject('htmlfile');
  return html.parentWindow.clipboardData.getData('text') || '';
})();

/**
 * Create a list including UrlObject instances.
 *
 * @public
 * @static
 * @method
 * @param  {string} source- Text for URLs
 * @retrun {Array} an array including UrlObject instances
 */
UrlObjectList.creteList = function(source){

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in UrlObjectList

  /**
   * Trim white spaces from string.
   *
   * @private
   * @method
   * @param  {string} str - string
   * @return {string} Retrun string trimmed white spaces
   */
  function trim(str) {
    return str.replace(/^[\s\t\r　]+|[\s\t\r　]+$/g, '');
  }

  /**
   * Raise an error.
   *
   * @private
   * @method
   * @param  {string} source - String for URLs
   */
  function failParsingUrl(source){
    WScript.Echo(
        "An error occurred while parsing by UrlObjectList.\n\n" +
        "source:\n" + source
        );
    WScript.Quit(1);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in UrlObjectList

  var urlObjectList = [];
  var sourceArray = source.split("\n");

  for (var i = 0; i < sourceArray.length; i++) {
    var urlObject = new UrlObject(trim(sourceArray[i]));

    if (urlObject.isUrl) {
      urlObjectList.push(urlObject);
    }
  }

  if (urlObjectList.length < 1) {
    failParsingUrl(source);
  }

  return urlObjectList;
};
