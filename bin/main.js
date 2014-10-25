var tempSuffix = ' (downloading)';
var url        = getUrl();
var outputPath = createOutputPath(url, tempSuffix);

// WScript.echo(url);
// WScript.echo(outputPath);

if (url.length > 0 && outputPath.length > 0) {
  downloadFile(url, outputPath, tempSuffix);
}
