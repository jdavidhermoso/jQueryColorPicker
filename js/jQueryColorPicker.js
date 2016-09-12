(function($) {
    $.fn.colorPicker = function(options) {
        var colorPicker = this,
            validateHexColor = function(color) {
                var validHexColor =  new RegExp("/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/");
                if (validHexColor.test(color) ) {
                    return false;
                } else {
                    return true;
                }
            };
        this.each(function() {
            console.log(colorPicker);
           if (validateHexColor($(this).val()) ) {
               console.log('Color válido');
           } else {
               console.log('Invalido');
           }
        });
    };
})(jQuery);