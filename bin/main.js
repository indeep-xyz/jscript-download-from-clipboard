var url  = getUrl();
var path = getOutputPath(url);

// WScript.echo(url);
// WScript.echo(path);

if (url.length + path.length > 0){
  downloadFile(url, path);
}
