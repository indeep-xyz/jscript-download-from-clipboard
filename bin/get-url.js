function getUrl() {

  function getClipboardText() {
    var html = new ActiveXObject('htmlfile');
    return html.parentWindow.clipboardData.getData("text");
  }

  function checkUrl(text) {
    return /\/\w/.test(text)
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main

  var text = getClipboardText();
  var url  = '';

  if (checkUrl(text)) {
    url = text;
  }
  else {
    WScript.Echo(
        "the clipboard text is not URL.\n\n" +
        text
        );
  }

  return url;
}
