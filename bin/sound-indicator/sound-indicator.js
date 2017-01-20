/**
 * This class supports to indicate with sound.
 *
 * @class
 * @constructor
 * @param  {object} options                  - Options for indication with sound.
 * @param  {string} options.soundAtCompleted - A path of a sound file to indicate.
 * @param  {string} options.soundVolume - Sound volume when playing media file.
 */
function SoundIndicator(options) {
  this.soundAtCompleted = options.soundAtCompleted;
  this.soundVolume = options.soundVolume;
}

/**
 * @public
 * @static
 * @type {string} The defalut path of a sound file.
 */
SoundIndicator.prototype.soundAtCompleted = '';

/**
 * @public
 * @static
 * @type {number} Sound volume when playing media file.
 */
SoundIndicator.prototype.soundVolume = 100;

/**
 * Play sound file.
 *
 * @public
 * @static
 * @method
 * @param  {string} path - A path expected as a sound file.
 */
SoundIndicator.prototype.playSound = function(path) {
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in SoundIndicator.prototype.playSound

  /**
   * Check whether a file is at the argument path.
   *
   * @private
   * @method
   * @param  {string} path - A path expected as a sound file.
   */
  function doesExist(path) {
    var fs = new ActiveXObject('Scripting.FileSystemObject');
    return fs.FileExists(path);
  }

  /**
   * Play a sound file at the argument path.
   *
   * @private
   * @method
   * @param  {string} path - A path expected as a sound file.
   */
  function play(path, volume) {
    var player = WScript.CreateObject("WMPlayer.OCX");

    if (typeof volume === 'number') {
      player.settings.volume = volume;
    }

    player.URL = path;
    player.controls.play();

    while(player.PlayState !== 1){
      WScript.Sleep(500);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in SoundIndicator.prototype.playSound

  if (doesExist(path)) {
    play(path, this.soundVolume);
  }
};

/**
 * Play sound file at downloading completed.
 *
 * @public
 * @static
 * @method
 */
SoundIndicator.prototype.playSoundAtCompleted = function() {
  this.playSound(this.soundAtCompleted);
};