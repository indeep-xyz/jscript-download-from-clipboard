function SoundIndicator(options) {
  this.soundFilePath = options.soundAtCompleted;
}

SoundIndicator.prototype.soundFilePath = '';

/**
 * @public
 * @static
 */
SoundIndicator.prototype.playSound = function() {
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in SoundIndicator.prototype.playSound

  function doesExist(path) {
    var fs = new ActiveXObject('Scripting.FileSystemObject');
    return fs.FileExists(path);
  }

  function play(path) {
    var player = WScript.CreateObject("MediaPlayer.MediaPlayer");
    player.FileName = path;
    player.Play();

    while(player.PlayState !== 0){
      WScript.Sleep(500);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in SoundIndicator.prototype.playSound

  var path = this.soundFilePath;

  if (doesExist(path)) {
    play(path);
  }
};
