/*!
 * Author: Michael Scharl
 */

(function ( $ ) {
    if (!$.cbToolkit) {
        $.cbToolkit = {};
    }

    $.cbToolkit.labelHide = function ( el, myFunctionParam, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data( "cbToolkit.labelHide" , base );

        base.init = function () {
            base.myFunctionParam = myFunctionParam;

            base.options = $.extend({},
                $.cbToolkit.labelHide.defaultOptions, options);

            base.$el.on('input.labelHide, change.labelHide, keyup.labelHide, focus.labelHide, blur.labelHide', base.labelHideEventHandler);
        };

        base.labelHideEventHandler = function() {

            var $input = jQuery(this),
                value = $input.val().toString(),
                id = $input.attr('id'),
                $label = jQuery('label[for="' + id + '"]');

            if($label.length) switch(value.length > 0) {
                case true:
                    $label.hide(); break;

                case false:
                    $label.fadeIn(); break;
            }
        };

        // Sample Function, Uncomment to use
        // base.functionName = function( paramaters ){
        //
        // };
        // Run initializer
        base.init();
    };

    $.cbToolkit.labelHide.defaultOptions = {
        myDefaultValue: ""
    };

    $.fn.cbToolkit_labelHide = function
        ( myFunctionParam, options ) {
        return this.each(function () {
            (new $.cbToolkit.labelHide(this,
                myFunctionParam, options));
        });
    };

})( jQuery );
