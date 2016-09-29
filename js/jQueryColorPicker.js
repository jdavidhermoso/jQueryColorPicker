(function($) {
    $.fn.colorPicker = function(options) {
        this.each(function() {
            var settings = $.extend({
                colorPicker: $(this),
                defaultColor : {color:'#FFF'},
                colors: [{color:'#FFF'},{color:'#CCC'},{color:'#888'}],
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
                showColorsList = function(colors) {
                    var colorsList = $('<div class="cp-colors-list-container"><div class="cp-colors-list-color" data-checked="1" data-color="'+settings.defaultColor.color+'" style="background: '+settings.defaultColor.color+'">'+settings.defaultColor.color+'</div></div>'),
                        color;
                    for (var i= 0,z = colors.length;i<z;i++) {
                        color = $('<div class="cp-colors-list-color" data-checked="0" data-color="'+colors[i].color+'" style="background: '+colors[i].color+'">'+colors[i].color+'</div>');
                        colorsList.append(color);
                    }
                    colorsList.insertAfter(settings.colorPicker);
                    $('.cp-colors-list-container').css('width',(settings.colorPicker[0].clientWidth+2)+"px");
                    settings.colorPicker.addClass('openList');
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
            $(this).parent().on('click','.cp-colors-list-color', function() {
                var selectedColor = $(this).data('color');
                settings.colorPicker.trigger('selectedColor',selectedColor);
            });
            settings.colorPicker.on('selectedColor', function(e,color) {
                changeBgColor(settings.colorPicker,color);
                settings.colorPicker.val(color);
                settings.colorPicker.trigger('hideColorsList');
            });
            $(document).on('keyup', function(e) {
                if (e.keyCode == 27) {
                    settings.colorPicker.trigger('hideColorsList');
                    settings.colorPicker.trigger('blur');
                }
            });
            $(document).on('click', function(e) {


            });
            $(document).on('mouseover.hover','.cp-colors-list-color', function() {
                changeBgColor($(this),settings.hoverColor);
            });
            $(document).on('mouseout.hover','.cp-colors-list-color', function() {
                changeBgColor($(this),$(this).data('color'));
            });
            settings.colorPicker.on('click', function(e) {
                e.stopPropagation();
                    if (!$(this).parent().find('.cp-colors-list-container').length) {
                        settings.colorPicker.trigger('showColorsList');
                    } else {
                        settings.colorPicker.trigger('hideColorsList');
                    }
            });
            encapsulateColorPicker();
            init();
        });
    };
})(jQuery);