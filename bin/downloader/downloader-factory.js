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
  if (true) {
    return new FileDownloader(urlObject, tempSuffix);
  }
};