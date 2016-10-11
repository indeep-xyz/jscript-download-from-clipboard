/**
 * Download a file from an URL argument.
 *
 * @class
 * @param  {UrlObject} urlObject  - An URL for downloading
 * @param  {string}    tempSuffix - A suffix for a tempolary file at downloading
 */
function FileDownloader(urlObject, tempSuffix) {
  this.urlObject = urlObject;
  this.tempSuffix = tempSuffix;
}

/**
 * @extends {Downloader}
 */
FileDownloader.prototype = new Downloader();

/**
 * Download a file where is at this.urlObject.origin.
 *
 * @method
 */
FileDownloader.prototype.download =  function(){

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

  var url        = this.urlObject.origin;
  var outputPath = this.createOutputPath(url, this.tempSuffix);
  var tempPath   = outputPath + tempSuffix;

  try {
    this.createTempFile(tempPath);
    run(url, tempPath);
    this.renameFile(tempPath, outputPath);
  }
  catch (e) {
    this.raiseError(url, tempPath, outputPath);
  }
};