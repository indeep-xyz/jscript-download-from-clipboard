/**
 * This class supports to notify with sound.
 *
 * @class
 * @constructor
 * @param  {object} options                 - Options for notification with sound.
 * @param  {string} options.voiceAtComplete - Message used for voice notification when finishing tasks completely.
 * @param  {string} options.soundVolume     - Sound volume when playing media file.
 */
function VoiceNotifier(options) {
  this.voiceAtComplete = options.voiceAtComplete;
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

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in VoiceNotifier.prototype.notifyWithVoice

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