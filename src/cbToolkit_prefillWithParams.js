/**
 *
 * cbToolkit.prefillWithParams.js
 * ------------------------------------------------
 *
 * Replaces all input fields with their ID like the key of the GET Parameter with the GET Value. GET Params with no
 * fitting input-field id are ignored.
 *
 * Author:
 *  Christoph Schleifer <christoph.schleifer(a)campaigning-bureau.com>
 *
 *
 *
 *  Example:
 * ------------------------------------------------
 *
 * -------- Hide the Label after it is set --------
 *
 * HTML Text:
 *
 *  <form id='myForm'>
 *   <label for="input-id" class="cbToolkit-prefill-hide">Labeltext</label>
 *   <input type='email' id="input-id"/>
 *  </form>
 *
 * GetParams:
 *
 *  http://mydomain.com/path/to/document/?input-id=newValue
 *
 * Activate:
 *
 *  jQuery('#myForm').cbToolkit_prefillWithParams()
 *
 *
 *
 *  ---- Keep the Label shown after the value is set ----
 *
 *  HTML Text:
 *
 * <label for="input-id" >Labeltext</label>
 * <input type='email' id="input-id"/>
 *
 *  GetParams:
 *
 *  http://mydomain.com/path/to/document/?input-id=newValue
 *
 *
 * Licensed under the MIT license
 */

(function ($) {
    if (!$.cbToolkit) {
        $.cbToolkit = {};
    }


    /**
     * Plugin prefillWithParams
     *
     * @param el
     * @param options
     *          autoHideLabels: "always" (default) - always hide corresponding label
     *                          "class"            - hide corresponding label with .cbToolkit-prefill-hide
     *                          "never"            - never hide corresponding label
     */
    $.cbToolkit.prefillWithParams = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("cbToolkit.prefillWithParams", base);

        base.init = function () {

            base.options = $.extend({},
                $.cbToolkit.prefillWithParams.defaultOptions, options);

            // Put your initialization code here
            base.fillInParameters();
        };

        /**
         * fill in Parameters
         */
        base.fillInParameters = function () {
            var urlParams = window.location.search.replace('?', '').split('&');
            if (urlParams === 0) return;

            jQuery(urlParams).each(function () {

//                Get the Key and Value
                var key_value_pair = this.split('=');

//                Set the Value for the found input field with id given
                base.$el.find('#' + key_value_pair[0] + '[:input]').val(key_value_pair[1]);

//                Hide the Label if the options apply
                var findString;
                if (base.options.autoHideLabel == 'always') {
                    findString = 'label[for=' + key_value_pair[0] + ']';
                }
                else if (base.options.autoHideLabel == 'class') {
                    findString = 'label.cbToolkit-prefill-hide[for=' + key_value_pair[0] + ']';
                }
                else {
                    return;
                }
                base.$el.find(findString).hide();
            });
        };

        // Run initializer
        base.init();
    };

    $.cbToolkit.prefillWithParams.defaultOptions = {
        autoHideLabel: "always"
    };

    $.fn.cbToolkit_prefillWithParams = function
        (options) {
        return this.each(function () {
            (new $.cbToolkit.prefillWithParams(this, options));
        });
    };

})(jQuery);
