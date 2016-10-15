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

/**
 * Check whether the execution file is available or not.
 *
 * @static
 * @method
 * @param  {string}  path - A path for the execution file of youtube-dl. The default path is at bin/EXT/youtube-dl.exe
 * @return {boolean} Return true when the file is available
 */
YoutubeDownloader.isExeAvailable = function(path) {
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in YoutubeDownloader.isExeAvailable

  /**
   * Get the default path for youtube-dl.
   *
   * @private
   * @method
   * @return {boolean} Return the default path
   */
  function getDefaultPath() {
    var binDir = WScript.ScriptFullName.match(/(^.+[\\\/])/)[0];
    return binDir + 'EXT/youtube-dl.exe';
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in YoutubeDownloader.isExeAvailable

  var fs = new ActiveXObject('Scripting.FileSystemObject');
  path = path || getDefaultPath();

  return fs.FileExists(path);
};