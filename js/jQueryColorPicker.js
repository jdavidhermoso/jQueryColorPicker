(function($) {
    $.fn.colorPicker = function(options) {
        this.each(function() {
            var settings = $.extend({
                colorPicker: $(this),
                defaultColor : '#CCC',
                colors: [{name:'White',color:'#FFF'},{name:'Silver',color:'#CCC'},{name:'Gray',color:'#888'}],
                hoverColor: '#3AD',
                colorOptionClass: 'color'
            }, options),
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
                },
                hideColorsList = function() {
                    console.log(settings.colorPicker.next());
                    settings.colorPicker.next().remove();
                },
                changeBgColor = function(el,color) {
                    el.css('background',color);
                };
            settings.colorPicker.on('showColorsList',function() {
                showColorsList(settings.colors);
            });
            settings.colorPicker.on('hideColorsList',function() {
                hideColorsList();
            });
            settings.colorPicker.on('selectedColor', function(e,color) {
                changeBgColor(settings.colorPicker,color);
                settings.colorPicker.val(color);
                settings.colorPicker.trigger('hideColorsList');
            });
            //TODO: Add the event handler only for $(this) -> colorOptionClass. Important cause causing issues
            $(this).parent().on('click','.'+settings.colorOptionClass, function() {
                var selectedColor = $(this).data('color');
                settings.colorPicker.trigger('selectedColor',selectedColor);
            });
            $(document).on('mouseover.hover','.'+settings.colorOptionClass, function() {
                $(this).addClass('cp-mouseover');
                changeBgColor($(this),settings.hoverColor);
            });
            $(document).on('mouseout.hover','.'+settings.colorOptionClass, function() {
                changeBgColor($(this),$(this).data('color'));
            });
            settings.colorPicker.on('focus', function() {
                settings.colorPicker.trigger('showColorsList');
            });

           if (validateHexColor($(this).val()) ) {
               changeBgColor($(this),$(this).val());
           } else {
               $(this).val(settings.defaultColor);
               changeBgColor($(this),settings.defaultColor);
           }

            $(this).addClass('cp-mouseover');
        });
    };
})(jQuery);