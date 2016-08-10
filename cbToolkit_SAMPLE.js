/*!
 * Author:
 */

(function ( $ ) {
    if (!$.cbToolkit) {
        $.cbToolkit = {};
    }

    $.cbToolkit.myPluginName = function ( el, myFunctionParam, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data( "cbToolkit.myPluginName" , base );

        base.init = function () {
            base.myFunctionParam = myFunctionParam;

            base.options = $.extend({},
                $.cbToolkit.myPluginName.defaultOptions, options);

            // Put your initialization code here
        };

        // Sample Function, Uncomment to use
        // base.functionName = function( paramaters ){
        //
        // };
        // Run initializer
        base.init();
    };

    $.cbToolkit.myPluginName.defaultOptions = {
        myDefaultValue: ""
    };

    $.fn.cbToolkit_myPluginName = function
        ( myFunctionParam, options ) {
        return this.each(function () {
            (new $.cbToolkit.myPluginName(this,
                myFunctionParam, options));
        });
    };

})( jQuery );
