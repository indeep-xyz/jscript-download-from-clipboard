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
 * @param  {UrlObject} urlObject  - An URL for downloading
 * @param  {string}    tempSuffix - A suffix for a tempolary file at downloading
 * @return {Downloader} An instance of Downloader classes
 */
DownloaderFactory.create = function(urlObject, tempSuffix) {
  if (YoutubeDownloader.isVideoUrl(urlObject)) {
    WScript.Echo('youtube video: ' + urlObject.origin);
    WScript.Quit();
    return new YoutubeDownloader(urlObject);
  }
  if (YoutubeDownloader.isPlaylistUrl(urlObject)) {
    WScript.Echo('youtube playlist: ' + urlObject.origin);
    WScript.Quit();
    return new YoutubeDownloader(urlObject);
  }
  else {
    // WScript.Echo('not youtube: ' + urlObject.origin);
    // WScript.Quit();
    return new FileDownloader(urlObject, tempSuffix);
  }
};