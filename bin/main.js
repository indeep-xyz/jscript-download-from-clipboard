// - - - - - - - - - - - - - - - - - - - - - -
// options

var options = {
  tempSuffix: ' (downloading)'
};

// - - - - - - - - - - - - - - - - - - - - - -
// main

var urlObjectList = new UrlObjectList();

for (var i = 0; i < urlObjectList.list.length; i++) {
  var urlObject = urlObjectList.list[i];
  var downloader = DownloaderFactory.create(urlObject, options);

  downloader.download(urlObject.origin);
}
