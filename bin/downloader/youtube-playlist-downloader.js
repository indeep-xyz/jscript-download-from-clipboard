/**
 * Download videos in playlist from YouTube.
 *
 * @class
 * @constructor
 * @param  {object} options               - Options for running
 * @param  {string} options.youtubeDlPath - A path for the execution file of youtube-dl
 * @param  {string} options.youtubePlaylistOutputPath - A format to output files by youtube-dl
 */
function YoutubePlaylistDownloader(options) {
  this.pathYoutubeDl = options.youtubeDlPath || YoutubeDownloader.DEFAULT_PATH_YOUTUBE_DL;
  this.outputPath = options.youtubePlaylistOutputPath || YoutubePlaylistDownloader.DEFAULT_OUTPUT_PATH;
}

/**
 * @extends {YoutubeDownloader}
 */
YoutubePlaylistDownloader.prototype = new YoutubeDownloader();

/**
 * @public
 * @static
 * @var {string} The default format of path which youtube-dl downloads videos in a playlist and write to.
 */
YoutubePlaylistDownloader.DEFAULT_OUTPUT_PATH = (function(){
  return '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s';
})();

/**
 * Download videos in a playlist from YouTube.
 *
 * @public
 * @method
 * @param  {url} url - An URL of a playlist
 */
YoutubePlaylistDownloader.prototype.download =  function(url){
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in YoutubePlaylistDownloader.prototype.download

  /**
   * Run youtube-dl for getting a video file.
   *
   * @private
   * @method
   * @param  {string} url - A video URL for downloading
   */
  function run(url) {
    var shell = new ActiveXObject("WScript.Shell");
    var command = "\"" + self.pathYoutubeDl + "\" -o \"" + self.outputPath + "\" " + url;

    // arg[0]:
    //          The command for youtube-dl running.
    // arg[1]:
    //       0: The window does not display by the software.
    //       1: The window launched by the software has a normal window size and is active.
    //       4: The window launched by the software has a normal window size and is not active.
    // arg[2]:
    //    true: The software runs synchronously.
    //   false: The software runs asynchronously. (default of the run method)
    shell.run(command, 4, true);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in YoutubePlaylistDownloader.prototype.download

  var self = this;
  YoutubeDownloader.requireExeAvailable(self.pathYoutubeDl);

  try {
    run(url);
  }
  catch (e) {
    this.raiseError(url);
  }
};

/**
 * Raise an error.
 *
 * @public
 * @method
 * @param  {string} url - An URL for downloading
 */
YoutubePlaylistDownloader.prototype.raiseError = function(url){
  WScript.Echo(
      "An error occurred while processing by YoutubePlaylistDownloader.\n\n" +
      "url:\n"             + url + "\n\n" +
      "outputPath:\n"      + this.outputPath + "\n\n" +
      "pathYoutubeDl:\n"   + this.pathYoutubeDl
      );
  WScript.Quit(1);
};
