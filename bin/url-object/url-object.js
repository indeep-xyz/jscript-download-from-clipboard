/**
 * Create an object to support an URL.
 *
 * @class
 * @param  [string] origin - Text for an URL
 */
function UrlObject(origin) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - for URL - in UrlObject

  function checkUrl(str) {
    var re = new RegExp('/');

    return re.test(str);
  }

  function extractProtocol(str) {
    var re = new RegExp('^([^:]+?)://');
    var ary = re.exec(str);

    return (ary === null) ? 'http' : ary[1];
  }

  function extractHostname(str) {
    var re = new RegExp('^([^:]+?://)?([^:/]+?)[:/]');
    var ary = re.exec(str);

    return (ary === null) ? '' : ary[2];
  }

  function extractPort(str) {
    var re = new RegExp('^([^:]+?://)?[^:]+:(\\d+)/?');
    var ary = re.exec(str);

    return (ary === null) ? 80 : parseInt(ary[2], 10);
  }

  function extractHash(str) {
    var re = new RegExp('#(.+)$');
    var ary = re.exec(str);

    return (ary === null) ? '' : ary[1];
  }

  function trim(str) {
    return str.replace(/^[\s\r\t\n　]+|[\s\r\t\n　]+$/g, '');
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - others - in UrlObject

  /**
   * Raise an error.
   *
   * @private
   * @method
   * @param  {string} str - String for an URL
   */
  function failParsingUrl(str){
    WScript.Echo(
        "An error occurred while parsing by UrlObject.\n\n" +
        "str:\n" + str
        );
    WScript.Quit(1);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in UrlObject

  origin = trim(origin);

  this.origin = origin;
  this.isUrl = checkUrl(origin);

  if (this.isUrl) {
    this.protocol = extractProtocol(origin);
    this.hostname = extractHostname(origin);
    this.port = extractPort(origin);
    this.hash = extractHash(origin);
  }
  else {
    failParsingUrl(origin);
  }
}
