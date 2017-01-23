/**
 * This class supports to notify with sound.
 *
 * @class
 * @constructor
 * @param  {object} options                 - Options for notification with sound.
 * @param  {string} options.soundAtComplete - A path of a sound file to notify.
 * @param  {string} options.soundVolume     - Sound volume when playing media file.
 */
function SoundNotifier(options) {
  this.soundAtComplete = options.soundAtComplete;
  this.soundVolume = options.soundVolume;
}

/**
 * @extends {Notifier}
 */
SoundNotifier.prototype = new Notifier();

/**
 * @public
 * @static
 * @type {string} A path of a sound file.
 */
SoundNotifier.prototype.soundAtComplete = '';

/**
 * @public
 * @static
 * @type {number} Sound volume when playing media file.
 */
SoundNotifier.prototype.soundVolume = 100;

/**
 * Notify with sound file.
 *
 * @public
 * @static
 * @method
 * @param  {string} path - A path expected as a sound file.
 */
SoundNotifier.prototype.notifyWithSound = function(path) {
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in SoundNotifier.prototype.playSound

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
   * @param  {number} volume - Sound volume when playing media file.
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
  // main - in SoundNotifier.prototype.playSound

  if (doesExist(path)) {
    play(path, this.soundVolume);
  }
};

/**
 * Notify at finishing downloading files completely.
 *
 * @public
 * @static
 * @method
 */
SoundNotifier.prototype.notifyAtComplete = function() {
  this.notifyWithSound(this.soundAtComplete);
};