/**
 * This class supports to notify with sound.
 *
 * @class
 * @constructor
 * @param  {object} options                 - Options for notification with sound.
 * @param  {string} options.voiceAtComplete - Message used for voice notification when finishing tasks completely.
 * @param  {string} options.voiceAtDownload - Message used for voice notification when finishing a file.
 * @param  {string} options.soundVolume     - Sound volume when playing media file.
 */
function VoiceNotifier(options) {
  this.voiceAtComplete = options.voiceAtComplete;
  this.voiceAtDownload = options.voiceAtDownload;
  this.soundVolume = options.soundVolume;
}

/**
 * @extends {Notifier}
 */
VoiceNotifier.prototype = new Notifier();

/**
 * @public
 * @static
 * @type {string} Message used for voice notification when finishing tasks completely.
 */
VoiceNotifier.prototype.voiceAtComplete = '';

/**
 * @public
 * @static
 * @type {string} Message used for voice notification when finishing a file.
 */
VoiceNotifier.prototype.voiceAtDownload = '';

/**
 * @public
 * @static
 * @type {number} Sound volume when playing media file.
 */
VoiceNotifier.prototype.soundVolume = 100;

/**
 * Notify with sound file.
 *
 * @public
 * @static
 * @method
 * @param  {string} message - Message used for voice notification.
 */
VoiceNotifier.prototype.notifyWithVoice = function(message) {
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in VoiceNotifier.prototype.notifyWithVoice

  /**
   * Check message text is valid.
   *
   * @private
   * @method
   * @param  {string} message - Message used for voice notification.
   */
  function isValid(message) {
    return typeof message === 'string' &&
        0 < message.length;
  }

  /**
   * Play a sound file at the argument path.
   *
   * @private
   * @method
   * @param  {string} message - Message used for voice notification.
   * @param  {number} volume  - Sound volume when playing media file.
   */
  function play(message, volume) {
    var spVoice = WScript.CreateObject('SAPI.SpVoice');

    if (typeof volume === 'number') {
      spVoice.volume = volume;
    }

    spVoice.speak(message);
    spVoice.waitUntilDone(-1);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in VoiceNotifier.prototype.notifyWithVoice

  if (isValid(message)) {
    play(message, this.soundVolume);
  }
};

/**
 * Notify at finishing downloading files completely.
 *
 * @public
 * @static
 * @method
 */
VoiceNotifier.prototype.notifyAtComplete = function() {
  this.notifyWithVoice(this.voiceAtComplete);
};

/**
 * Notify at finishing downloading a file.
 *
 * @public
 * @static
 * @method
 * @param {object} replacement           - Replacement for notification message.
 * @param {number} replacement.countDown
 *     - Counting down every finishing downloading a file when downloading multiple files.
 */
VoiceNotifier.prototype.notifyAtDownload = function(replacement) {
  var message = this.voiceAtDownload;

  if (typeof replacement.countDown !== 'object' &&
      replacement.countDown > 0) {
    message = message.replace(/%C/g, replacement.countDown);
  }

  this.notifyWithVoice(message);
};
