function downloadFile(url, outputPath) {

  function run() {
    var http                  = WScript.CreateObject("Msxml2.XMLHTTP");
    var stream                = WScript.CreateObject("Adodb.Stream");
    var adTypeBinary          = 1;
    var adSaveCreateOverWrite = 2;

    http.Open("GET", url, false);
    http.Send();
    stream.type = adTypeBinary;
    stream.Open();
    stream.Write(http.responseBody);
    stream.Savetofile(path, adSaveCreateOverWrite);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main

  try {
    run();
  }
  catch (e) {
    WScript.Echo(
        "error until the download process\n\n" +
        "url: " + url + "\n" +
        "outputPath: " + outputPath
        );
  }
}