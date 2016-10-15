/**
 * Get text from clipboard.
 *
 * @return [string] Text in clipboard
 */
function getTextFromClipboard() {
  var html = new ActiveXObject('htmlfile');
  return html.parentWindow.clipboardData.getData('text');
}