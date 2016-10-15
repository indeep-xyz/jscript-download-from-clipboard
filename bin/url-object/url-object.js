/**
 * Create an object to support an URL.
 *
 * @class
 * @param  [string] origin - Text for an URL
 */
function UrlObject(origin) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in UrlObject

  /**
   * Check whether the argument is an URL or not.
   *
   * @private
   * @method
   * @param  {string}  str - String which is expected for an URL
   * @return {boolean} Return true if the argument is an URL
   */
  function checkUrl(str) {
    var re = new RegExp('/');

    return re.test(str);
  }

  /**
   * Extract string as a hash from an URL.
   *
   * @private
   * @method
   * @param  {string} str - An URL
   * @return {string} Return a string as a hash
   */
  function extractHash(str) {
    var re = new RegExp('#(.+)$');
    var ary = re.exec(str);

    return (ary === null) ? '' : ary[1];
  }

  /**
   * Extract string as a hostname from an URL.
   *
   * @private
   * @method
   * @param  {string} str - An URL
   * @return {string} Return a string as a hostname
   */
  function extractHostname(str) {
    var re = new RegExp('^([^:]+?://)?([^:/]+?)[:/]');
    var ary = re.exec(str);

    return (ary === null) ? '' : ary[2];
  }

  /**
   * Extract string as a port from an URL.
   *
   * @private
   * @method
   * @param  {string} str - An URL
   * @return {string} Return a string as a port
   */
  function extractPort(str) {
    var re = new RegExp('^([^:]+?://)?[^:]+:(\\d+)/?');
    var ary = re.exec(str);

    return (ary === null) ? '' : parseInt(ary[2], 10);
  }

  /**
   * Extract string as a protocol from an URL.
   *
   * @private
   * @method
   * @param  {string} str - An URL
   * @return {string} Return a string as a protocol
   */
  function extractProtocol(str) {
    var re = new RegExp('^([^:]+?)://');
    var ary = re.exec(str);

    return (ary === null) ? 'http' : ary[1];
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
}
