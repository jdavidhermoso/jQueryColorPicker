(function($) {
    $.fn.colorPicker = function(options) {
        this.each(function() {
            var settings = $.extend({colorPicker: $(this),defaultColor : '#CCC',colors: [{name:'White',color:'#FFF'},{name:'Silver',color:'#CCC'},{name:'Gray',color:'#888'}],hoverColor: '#3AD'}, options),
                validateHexColor = function(color) {
                    var validHexColor =  new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
                    if (validHexColor.test(color) ) {
                        return true;
                    } else {
                        return false;
                    }
                },
                showColorsList = function(colors,selectedColor) {
                    var colorsList = $('<div class="color-picker-container" style="width:'+settings.colorPicker.width()+' ;"></div>'),
                        color;
                    for (var i= 0,z = colors.length;i<z;i++) {
                        color = $('<div class="color" data-color="'+colors[i].color+'" style="background: '+colors[i].color+'">'+colors[i].name+'</div>');
                        colorsList.append(color);
                    }
                    colorsList.insertAfter(settings.colorPicker);
                };
                hideColorsList = function() {
                    settings.colorPicker.next().remove();
                };

            settings.colorPicker.on('showColorsList',function() {
                showColorsList(settings.colors);
            });
            settings.colorPicker.on('hideColorsList',function() {
                hideColorsList();
            });
            settings.colorPicker.on('selectedColor', function(e,color) {
                settings.colorPicker.css('background',color);
                settings.colorPicker.val(color);
                settings.colorPicker.trigger('hideColorsList');
            });
            $(document).on('click','.color', function() {
                var selectedColor = $(this).data('color');
                settings.colorPicker.trigger('selectedColor',selectedColor);
            });
            $(document).on('mouseover.hover','.color', function() {
                $(this).css('background',settings.hoverColor);
            });
            $(document).on('mouseout.hover','.color', function() {
                $(this).css('background',$(this).data('color'));
            });


           if (validateHexColor($(this).val()) ) {
               $(this).css('background-color',$(this).val());
           } else {
               $(this).val(settings.defaultColor);
               $(this).css('background-color',settings.defaultColor);
           }
        });
    };
})(jQuery);