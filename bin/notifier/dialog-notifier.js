/**
 * This class supports to notify with dialog.
 *
 * @class
 * @constructor
 * @param  {object} options                  - Options for notification with dialog.
 * @param  {string} options.dialogAtComplete - Message used for dialog notification when finishing tasks completely.
 */
function DialogNotifier(options) {
  this.dialogAtComplete = options.dialogAtComplete;
}

/**
 * @extends {Notifier}
 */
DialogNotifier.prototype = new Notifier();

/**
 * @public
 * @static
 * @type {string} Message used for diaog notification when finishing tasks completely.
 */
DialogNotifier.prototype.dialogAtComplete = '';

/**
 * Notify with sound file.
 *
 * @public
 * @static
 * @method
 * @param  {string} message - Message used for dialog notification.
 */
DialogNotifier.prototype.notifyWithDialog = function(message) {
  // - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in DialogNotifier.prototype.notifyWithDialog

  /**
   * Check message text is valid.
   *
   * @private
   * @method
   * @param  {string} message - Message used for notification.
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
   * @param  {string} message - Message used for notification.
   */
  function showDialog(message) {
    WScript.Echo(message);
  }

  // - - - - - - - - - - - - - - - - - - - - - -
  // main - in DialogNotifier.prototype.notifyWithDialog

  if (isValid(message)) {
    showDialog(message);
  }
};

/**
 * Notify at finishing downloading files completely.
 *
 * @public
 * @static
 * @method
 * @param {object} replacement           - Replacement for notification message.
 * @param {number} replacement.numberOfFiles
 *     - Number of files to be downloaded.
 */
DialogNotifier.prototype.notifyAtComplete = function(replacement) {
  var message = this.dialogAtComplete;

  if (typeof replacement.numberOfFiles !== 'object' &&
      replacement.numberOfFiles > 0) {
    message = message.replace(/%n/g, replacement.numberOfFiles);
  }

  this.notifyWithDialog(message);
};

/**
 * Notify at finishing downloading a file.
 *
 * @public
 * @static
 * @method
 */
DialogNotifier.prototype.notifyAtDownload = function() {
};
