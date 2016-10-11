// - - - - - - - - - - - - - - - - - - - - - -
// options

var tempSuffix = ' (downloading)';

// - - - - - - - - - - - - - - - - - - - - - -
// main

var urlSource  = getTextFromClipboard();
var urlObject  = new UrlObject(urlSource);

if (urlObject.isUrl) {
  var downloader = DownloaderFactory.create(urlObject, tempSuffix);
  downloader.download();
}
