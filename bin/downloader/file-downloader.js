/**
 * Download a file from an URL argument.
 *
 * @class
 * @param  {object} options            - Options for running
 * @param  {string} options.tempSuffix - A suffix for a tempolary file at downloading
 */
function FileDownloader(options) {
  this.tempSuffix = options.tempSuffix || FileDownloader.defaultTempSuffix;
}

/**
 * @extends {Downloader}
 */
FileDownloader.prototype = new Downloader();

/**
 * @public
 * @static
 * @var {string} The default suffix of temporary file names at downloading.
 */
FileDownloader.defaultTempSuffix = ' (downloading)';

/**
 * Download a file at the argument "url".
 *
 * @method
 * @param  {url} url - An URL for downloading
 */
FileDownloader.prototype.download =  function(url){

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in FileDownloader.download

  function run(url, path) {
    var http                  = WScript.CreateObject('Msxml2.XMLHTTP');
    var stream                = WScript.CreateObject('Adodb.Stream');
    var adTypeBinary          = 1;
    var adSaveCreateOverWrite = 2;

    http.Open('GET', url, false);
    http.Send();
    stream.type = adTypeBinary;
    stream.Open();
    stream.Write(http.responseBody);
    stream.Savetofile(path, adSaveCreateOverWrite);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in FileDownloader.download

  var outputPath = this.createOutputPath(url, this.tempSuffix);
  var tempPath   = outputPath + this.tempSuffix;

  try {
    this.createTempFile(tempPath);
    run(url, tempPath);
    this.renameFile(tempPath, outputPath);
  }
  catch (e) {
    this.raiseError(url, tempPath, outputPath);
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
FileDownloader.prototype.raiseError = function(url, tempPath, outputPath){
  WScript.Echo(
      "An error occurred while processing by FileDownloader.\n\n" +
      "url:\n"        + url + "\n\n" +
      "tempPath:\n"   + tempPath   + "\n\n" +
      "outputPath:\n" + outputPath
      );
  WScript.Quit(1);
};
