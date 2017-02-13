var options = OptionLoader.load('main-options.js');
var urlObjectList = new UrlObjectList();
var soundNotifier = NotifierFactory.create(options);

for (var i = 0; i < urlObjectList.list.length; i++) {
  var urlObject = urlObjectList.list[i];
  var downloader = DownloaderFactory.create(urlObject, options);

  downloader.download(urlObject.origin);
  soundNotifier.notifyAtDownload({
      countDown: urlObjectList.list.length - i,
      numberOfFiles: urlObjectList.list.length
  });
}

soundNotifier.notifyAtComplete({
    numberOfFiles: urlObjectList.list.length
});
