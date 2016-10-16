// - - - - - - - - - - - - - - - - - - - - - -
// options

var options = {
  tempSuffix: ' (downloading)'
};

// - - - - - - - - - - - - - - - - - - - - - -
// main

var urlSource  = getTextFromClipboard();
var urlObject  = new UrlObject(urlSource);

if (urlObject.isUrl) {
  var downloader = DownloaderFactory.create(urlObject, options);
  downloader.download(urlObject.origin);
}
