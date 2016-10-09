/**
 * Download a file from an URL argument.
 *
 * @param  {string} url        - An URL for downloading
 * @param  {string} outputPath - A local path for downloading
 * @param  {string} tempSuffix - A suffix for a tempolary file at downloading
 */
function downloadFile(url, outputPath, tempSuffix) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in downloadFile

  function download(path) {
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

  function createTemp(path) {
    var FOR_WRITING    = 2;
    var TRISTATE_FALSE = 0;
    var fs   = new ActiveXObject('Scripting.FileSystemObject');
    var file = fs.CreateTextFile(path, FOR_WRITING, TRISTATE_FALSE);

    file.close();
  }

  function errorFailed(url, tempPath, outputPath){
    WScript.Echo(
        "error occurred while downloading or saving file.\n\n" +
        "url:\n"        + url        + "\n\n" +
        "tempPath:\n"   + tempPath   + "\n\n" +
        "outputPath:\n" + outputPath
        );
  }

  function rename(src, dest) {
    var fs   = new ActiveXObject('Scripting.FileSystemObject');
    fs.MoveFile(src, dest);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in downloadFile

  var tempPath = outputPath + tempSuffix;

  try {
    createTemp(tempPath);
    download(tempPath);
    rename(tempPath, outputPath);
  }
  catch (e) {
    errorFailed(url, tempPath, outputPath);
  }
}