/**
 *
 * cbToolkit_func_trackWindowMeasurements.js
 * --------------------------------------
 *
 * Author: Christoph Schleifer <christoph.schleifer@campaigning-bureau.com>
 *
 * Description:
 *     A function for tracking the window measurements to google analytics.
 *
 * Options:
 *
 *  - category {string} - default: 'statistics'
 *      GoogleAnalytics Event Category to track.
 *
 *  - action {string} - default: 'window_size'
 *      GoogleAnalytics Action to track.
 *
 *
 *
 * Usage:
 *
 * cbToolkit_trackWindowMeasurements(options);
 *
 */


/**
 * Sends the Window Measurements to Google Analytics.
 *
 * PREREQUISITS: The GoogleAnalytics must be already implemented in this Site.
 *
 * @param options category and action
 */
function cbToolkit_trackWindowMeasurements(options) {
    var defaultOptions = {};
        defaultOptions.category = 'statistics';
        defaultOptions.action = 'window_size';

    options = jQuery.extend({}, defaultOptions, options);


//    push to GoogleAnalytics
    if (typeof _gaq !== 'undefined') {
        _gaq.push(['_trackEvent', options.category, options.action, 'width', jQuery(window).width()]);
        _gaq.push(['_trackEvent', options.category, options.action, 'height', jQuery(window).height()]);
//        if(window.console) console.log('Track Events using ga.js');
    }
    if (typeof ga !== 'undefined') {
        ga('send', 'event', options.category, options.action, 'width', jQuery(window).width());
        ga('send', 'event', options.category, options.action, 'height', jQuery(window).height());
//        if(window.console) console.log('Track Events using analytics.js');
    }

}
