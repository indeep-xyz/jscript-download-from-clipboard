/**
 * Download videos at YouTube from an URL argument.
 *
 * @class
 * @param  {UrlObject} urlObject  - An URL for downloading
 * @param  {string}    tempSuffix - A suffix for a tempolary file at downloading
 */
function YoutubeDownloader(urlObject) {
  this.urlObject = urlObject;
}

/**
 * @extends {Downloader}
 */
YoutubeDownloader.prototype = new Downloader();

/**
 * Check whether the argument URL is a video or a playlist at YouTube or not.
 *
 * @static
 * @method
 * @param  {UrlObject} urlObject  - An URL for downloading
 * @return {boolean} Return true if an URL is at YouTube.
 */
YoutubeDownloader.isUrl = function(urlObject) {
  return YoutubeDownloader.isVideoUrl(urlObject) ||
      YoutubeDownloader.isPlaylistUrl(urlObject);
};

/**
 * Check whether the argument URL is a video at YouTube or not.
 *
 * @static
 * @method
 * @param  {UrlObject} urlObject - An URL for downloading
 * @return {boolean} Return true if an URL is at YouTube.
 */
YoutubeDownloader.isVideoUrl = function(urlObject) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in YoutubeDownloader.isVideoUrl

  /**
   * Check the URL is full for a video.
   *
   * @private
   * @method
   * @param  {UrlObject} urlObject - An URL for downloading
   * @return {boolean} Return true if an URL is at YouTube.
   */
  function isFullUrl(urlObject) {
    return (/(www\.)?youtube\.com/).test(urlObject.hostname) &&
        (/\/watch\?v=.+/).test(urlObject.origin);
  }

  /**
   * Check the URL is short for a video.
   *
   * @private
   * @method
   * @param  {UrlObject} urlObject - An URL for downloading
   * @return {boolean} Return true if an URL is at YouTube.
   */
  function isShortUrl(urlObject) {
    return (/youtu\.be/).test(urlObject.hostname);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in YoutubeDownloader.isVideoUrl

  return isFullUrl(urlObject) ||
      isShortUrl(urlObject);
};

/**
 * Check whether the argument URL is a playlist at YouTube or not.
 *
 * @static
 * @method
 * @param  {UrlObject} urlObject - An URL for downloading
 * @return {boolean} Return true if an URL is at YouTube.
 */
YoutubeDownloader.isPlaylistUrl = function(urlObject) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in YoutubeDownloader.isPlaylistUrl

  /**
   * Check the URL is full for a video.
   *
   * @private
   * @method
   * @param  {UrlObject} urlObject - An URL for downloading
   * @return {boolean} Return true if an URL is at YouTube.
   */
  function isFullUrl(urlObject) {
    return (/(www\.)?youtube\.com/).test(urlObject.hostname) &&
        (/\/playlist\?list=.+/).test(urlObject.origin);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in YoutubeDownloader.isPlaylistUrl

  return isFullUrl(urlObject);
};