/**
 * A factory for notifier class.
 *
 * @class
 * @constructor
 */
var NotifierFactory = function(){};

/**
 * Create a notifier instance by the options.
 *
 * @public
 * @static
 * @method
 * @param  {object}    options                 - Options for notification.
 * @param  {string}    options.soundAtComplete - A path of a sound file to notify.
 * @param  {string}    options.soundVolume     - Sound volume when playing media file.
 * @return {Notifier} An instance of Notifier classes.
 */
NotifierFactory.create = function(options) {
  if (typeof options.soundAtComplete === 'string') {
    return new SoundNotifier(options);
  }
  else {
    // WScript.Echo('not youtube: ' + urlObject.origin);
    // WScript.Quit();
    return new Notifier(options);
  }
};