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

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in UrlObject

  function errorParseUrl(str){
    WScript.Echo(
        "error occurred while parsing the URL string.\n\n" +
        "str:\n" + str
        );
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in UrlObject

  this.origin = origin;
  this.isUrl = checkUrl(origin);

  if (this.isUrl) {
    this.protocol = extractProtocol(origin);
    this.hostname = extractHostname(origin);
    this.port = extractPort(origin);
    this.hash = extractHash(origin);
  }
  else {
    errorParseUrl(origin);
  }
}
