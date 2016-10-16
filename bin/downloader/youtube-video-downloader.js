/**
 * Download videos at YouTube from an URL argument.
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
 * @param  {url} url - An URL for downloading
 */
YoutubeVideoDownloader.prototype.download =  function(url){

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in YoutubeVideoDownloader.download

  /**
   * Run youtube-dl for getting a video file.
   *
   * @param  {string} url           - A video URL for downloading
   * @param  {string} pathYoutubeDl - A path for the execution file of youtube-dl
   */
  function run(url, pathYoutubeDl) {
    var shell = new ActiveXObject("WScript.Shell");
    var command = "\"" + pathYoutubeDl + "\"" + " " + url;

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

  var pathYoutubeDl = this.pathYoutubeDl;

  YoutubeDownloader.requireExeAvailable(pathYoutubeDl);

  try {
    run(url, pathYoutubeDl);
  }
  catch (e) {
    this.raiseError(url);
  }
};

/**
 * Raise an error.
 *
 * @method
 * @param  {string} url        - An URL for downloading
 * @param  {string} tempPath   - A path for a temporary file
 * @param  {string} outputPath - A path which you tried to write a file
 */
YoutubeVideoDownloader.prototype.raiseError = function(url){
  WScript.Echo(
      "An error occurred while processing by YoutubeVideoDownloader.\n\n" +
      "url:\n"             + url + "\n\n" +
      "pathYoutubeDl:\n"   + this.pathYoutubeDl
      );
  WScript.Quit(1);
};
