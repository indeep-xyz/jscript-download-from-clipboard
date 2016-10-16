/**
 * Download videos at YouTube from an URL argument.
 *
 * @class
 */
function YoutubeDownloader() {

}

/**
 * @extends {Downloader}
 */
YoutubeDownloader.prototype = new Downloader();

/**
 * @static
 * @var {string} the default path  for youtube-dl.
 */
YoutubeDownloader.defaultPathYoutubeDl = (function(){
  var binDir = WScript.ScriptFullName.match(/(^.+[\\\/])/)[0];
  return binDir + 'EXT/youtube-dl.exe';
})();

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
  var fs = new ActiveXObject('Scripting.FileSystemObject');
  path = path || YoutubeDownloader.defaultPathYoutubeDl;

  return fs.FileExists(path);
};

/**
 * Require the execution file is available.
 *
 * @static
 * @method
 * @param  {string}  path - A path for the execution file of youtube-dl. The default path is at bin/EXT/youtube-dl.exe
 */
YoutubeDownloader.requireExeAvailable = function(path) {
  if (!YoutubeDownloader.isExeAvailable(path)) {
    WScript.Echo('Require youtube-dl to download video files from Youtube.');
    WScript.Quit(1);
  }
};