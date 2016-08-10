/**
 *
 * cbToolkit_trackHashView
 * --------------------------------------
 *
 * Author: Michael Scharl
 *
 * Description:
 *     Automatically track pages and URL Hashes based on the Navigation
 *
 * Options:
 *
 *  - setURLHash {boolean} - default: true
 *      Used to enable or disable the automatic hash
 *
 *  - sendPageview {boolean} - default: true
 *      Used to enable or disable the automatic hash tracking via google
 *
 *  - sectionHash {object} - default: {}
 *      Used to prefill the available sections. Will automatically be filled with sections from the Navigation
 *
 *
 *
 * Usage:
 *
 * jQuery('#navigation ul').cbToolkit_trackHashView();
 *
 */

(function ( $ ) {
    if (!$.cbToolkit) {
        $.cbToolkit = {};
    }

    $.cbToolkit.trackHashView = function ( el, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this,
            log = function(msg) {
                if(base.options.debug && window.console) {
                    console.debug(msg);
                }
            };

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        base.$w = $(window);
        base.w = window;

        base.offset = base.$w.height() / 2;

        base.sentPageview = [];

        // Add a reverse reference to the DOM object
        base.$el.data( "cbToolkit.trackHashView" , base );

        base.init = function () {

            base.options = $.extend({}, $.cbToolkit.trackHashView.defaultOptions, options);

            // Walk throught every link
            jQuery('a[href]', base.$el).each(function(index, item) {
                var hash = jQuery(item).attr('href').split('#');

                // If a hash exists push it into the hash array
                if(hash.length >= 1 && $('#' + hash[1]).length) base.options.sectionHash['#' + hash[1]] = 0;
            });

            for (var hash in base.options.sectionHash) {
                if($(hash).offset().top !== false) {
                    base.options.sectionHash[hash] = $(hash).offset().top;
                } else {
                    base.options.sectionHash[hash] = $(document).height() * 2;
                }
            }

            base.$w.on('scroll', base.onScroll);
        };

        // ScrollEvent Handler
        base.onScroll = function( event ){
            var top = base.$w.scrollTop(),
                setHash = '#';

            for(var hash in base.options.sectionHash) {
                var sectionTop = base.options.sectionHash[hash];

                setHash = (top >= sectionTop) ? hash : setHash;
            }

            base.feature.setURLHash(setHash);
            base.feature.sendPageview(setHash);
        };

        base.feature = {};

        base.feature.setURLHash = function(hash) {
            if(!base.options.setURLHash) return;

            if(('#' + location.hash !== hash && location.hash !== hash) && window.history.pushState) {
                log('Pushing Hash: ' + hash);
                window.history.pushState(null, null, hash);
            }
        };

        base.feature.sendPageview = function(hash) {
            if(!base.options.sendPageview) return;

            if($.inArray(hash, base.sentPageview) === -1 && typeof ga !== 'undefined') {
                log('Send Pageview: ' + hash);
                base.sentPageview.push(hash);
                ga('send', 'pageview', {page: hash});
            }
        };

        // Run initializer
        jQuery(base.init);
    };

    $.cbToolkit.trackHashView.defaultOptions = {
        setURLHash: true,
        sendPageview: true,
        sectionHash: {},
        debug: false
    };

    $.fn.cbToolkit_trackHashView = function
        ( options ) {
        return this.each(function () {
            (new $.cbToolkit.trackHashView(this, options));
        });
    };

})( jQuery );
