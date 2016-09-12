$(document).ready(function(){
    $('.color-picker-input').colorPicker();
    $('.color-picker-input').on('focus', function() {
        $('.color-picker-input').trigger('showColorsList');
    });
    $('.color-picker-input').on('blur', function() {
        //$('.color-picker-input').trigger('hideColorsList');
    });

});