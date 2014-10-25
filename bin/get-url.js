/**
 * get the string for URL from the clipboard
 *
 * @return string for URL
 */
function getUrl() {

  function getClipboardText() {
    var html = new ActiveXObject('htmlfile');
    return html.parentWindow.clipboardData.getData('text');
  }

  function checkUrl(str) {
    return /\//.test(str)
  }

  function errorParseUrl(str){
    WScript.Echo(
        "error occurred while parsing the URL string.\n\n" +
        "str:\n" + str
        );
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main

  var str = getClipboardText();
  var url = '';

  if (checkUrl(str)) {
    url = str;
  }
  else {
    errorParseUrl(str);
  }

  return url;
}
