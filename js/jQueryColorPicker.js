(function($) {
    $.fn.colorPicker = function(options) {
        this.each(function() {
            var settings = $.extend({
                colorPicker: $(this),
                defaultColor : {name:'White',color:'#FFF'},
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
                encapsulateColorPicker = function() {
                    var colorPickerWrapper = $('<div class="cp-wrapper"></div>'),
                        colorPickerParent = settings.colorPicker.parent();
                    settings.colorPicker.appendTo(colorPickerWrapper);
                    colorPickerParent.append(colorPickerWrapper);
                },
                showColorsList = function(colors,selectedColor) {
                    var colorsList = $('<div class="color-picker-list-container"><div class="color" data-color="'+settings.defaultColor.color+'" style="background: '+settings.defaultColor.color+'">'+settings.defaultColor.name+'</div></div>'),
                        color;
                    for (var i= 0,z = colors.length;i<z;i++) {
                        color = $('<div class="color" data-color="'+colors[i].color+'" style="background: '+colors[i].color+'">'+colors[i].name+'</div>');
                        colorsList.append(color);
                    }
                    settings.colorPicker.addClass('openList');
                    colorsList.insertAfter(settings.colorPicker);
                    $('.color-picker-list-container').css('width',(settings.colorPicker[0].clientWidth+2)+"px");
                },
                hideColorsList = function() {

                    settings.colorPicker.next().remove();
                    settings.colorPicker.removeClass('openList');
                },
                init = function() {
                    settings.colorPicker.attr('readonly','readonly');
                    settings.colorPicker.addClass('cp-input');
                    if (validateHexColor(settings.colorPicker.val()) ) {
                        changeBgColor(settings.colorPicker,settings.colorPicker.val());
                    } else {
                        settings.colorPicker.val(settings.defaultColor.color);
                        changeBgColor(settings.colorPicker,settings.defaultColor.color);
                    }
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
            $(this).parent().on('click','.'+settings.colorOptionClass, function() {
                var selectedColor = $(this).data('color');
                settings.colorPicker.trigger('selectedColor',selectedColor);
            });
            
            $(document).on('click', function(e) {
                settings.colorPicker.trigger('hideColorsList');
            });
            $(document).on('mouseover.hover','.'+settings.colorOptionClass, function() {
                changeBgColor($(this),settings.hoverColor);
            });
            $(document).on('mouseout.hover','.'+settings.colorOptionClass, function() {
                changeBgColor($(this),$(this).data('color'));
            });
            settings.colorPicker.on('focus click', function() {
                settings.colorPicker.trigger('showColorsList');
            });
            settings.colorPicker.on('blur', function() {
                settings.colorPicker.trigger('hideColorsList');
            });
            encapsulateColorPicker();
            init();
        });
    };
})(jQuery);