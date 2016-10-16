/**
 * A factory for downloader class.
 *
 * @class
 */
var DownloaderFactory = function(){};

/**
 * Create a downloader instance by the arguments
 * and the condition of external files.
 *
 * @static
 * @method
 * @param  {UrlObject} urlObject             - An URL for downloading
 * @param  {object}    options               - Options for running
 * @param  {string}    options.tempSuffix    - A suffix for a tempolary file at downloading
 * @param  {string}    options.youtubeDlPath - A path for the execution file of youtube-dl
 * @optional
 * @return {Downloader} An instance of Downloader classes
 */
DownloaderFactory.create = function(urlObject, options) {
  if (YoutubeDownloader.isVideoUrl(urlObject)) {
    return new YoutubeVideoDownloader(options);
  }
  if (YoutubeDownloader.isPlaylistUrl(urlObject)) {

    WScript.Echo('youtube playlist: ' + urlObject.origin);
    WScript.Quit();
    return new YoutubeDownloader(options);
  }
  else {
    // WScript.Echo('not youtube: ' + urlObject.origin);
    // WScript.Quit();
    return new FileDownloader(options);
  }
};