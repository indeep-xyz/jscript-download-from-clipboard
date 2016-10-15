/**
 * Download videos from YouTube.
 *
 * @class
 * @param  {object} options               - Options for running
 * @param  {string} options.youtubeDlPath - A path for the execution file of youtube-dl
 */
function YoutubeVideoDownloader(options) {
  this.pathYoutubeDl = options.youtubeDlPath || YoutubeDownloader.defaultPathYoutubeDl;
}

/**
 * @extends {YoutubeDownloader}
 */
YoutubeVideoDownloader.prototype = new YoutubeDownloader();

/**
 * Download a video from YouTube.
 *
 * @method
 * @param  {url} url - An URL of a video
 */
YoutubeVideoDownloader.prototype.download =  function(url){

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in YoutubeVideoDownloader.download

  /**
   * Run youtube-dl for getting a video file.
   *
   * @private
   * @method
   * @param  {string} url - A video URL for downloading
   */
  function run(url) {
    var shell = new ActiveXObject("WScript.Shell");
    var command = "\"" + self.pathYoutubeDl + "\"" + " " + url;

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
  // main - in YoutubeVideoDownloader.download

  var self = this;
  YoutubeDownloader.requireExeAvailable(this.pathYoutubeDl);

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
 * @method
 * @param  {string} url - An URL for downloading
 */
YoutubeVideoDownloader.prototype.raiseError = function(url){
  WScript.Echo(
      "An error occurred while processing by YoutubeVideoDownloader.\n\n" +
      "url:\n"             + url + "\n\n" +
      "pathYoutubeDl:\n"   + this.pathYoutubeDl
      );
  WScript.Quit(1);
};
