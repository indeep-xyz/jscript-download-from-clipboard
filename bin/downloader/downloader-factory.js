/**
 * A factory for downloader class.
 *
 * @class
 * @constructor
 */
var DownloaderFactory = function(){};

/**
 * Create a downloader instance by the arguments
 * and the condition of external files.
 *
 * @public
 * @static
 * @method
 * @param  {UrlObject} urlObject             - An URL for downloading
 * @param  {object}    options               - Options for running
 * @param  {string}    options.tempSuffix    - A suffix for a tempolary file at downloading
 * @param  {string}    options.youtubeDlPath - A path for the execution file of youtube-dl
 * @param  {string}    options.youtubePlaylistOutputPath - A format to output files by youtube-dl
 * @return {Downloader} An instance of Downloader classes
 */
DownloaderFactory.create = function(urlObject, options) {
  if (YoutubeDownloader.isVideoUrl(urlObject)) {
    return new YoutubeVideoDownloader(options);
  }

  if (YoutubeDownloader.isPlaylistUrl(urlObject)) {
    return new YoutubePlaylistDownloader(options);
  }

  return new FileDownloader(options);
};