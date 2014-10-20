function downloadFile(url, outputPath) {

  function run() {
    var http                  = WScript.CreateObject('Msxml2.XMLHTTP');
    var stream                = WScript.CreateObject('Adodb.Stream');
    var adTypeBinary          = 1;
    var adSaveCreateOverWrite = 2;

    http.Open('GET', url, false);
    http.Send();
    stream.type = adTypeBinary;
    stream.Open();
    stream.Write(http.responseBody);
    stream.Savetofile(outputPath, adSaveCreateOverWrite);
  }

  function createTempFile() {
    var FOR_WRITING    = 2;
    var TRISTATE_FALSE = 0;
    var fs   = new ActiveXObject('Scripting.FileSystemObject');
    var file = fs.CreateTextFile(outputPath, FOR_WRITING, TRISTATE_FALSE);

    file.close();
  }

  function errorFailed(){
    WScript.Echo(
        "error occurred while downloading or saving file.\n\n" +
        "url:\n" + url + "\n\n" +
        "outputPath:\n" + outputPath
        );
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main

  try {
    createTempFile();
    run();
  }
  catch (e) {
    errorFailed();
  }
}