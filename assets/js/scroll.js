$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $('#navToggle').hide();
    }
    else {
        $('#navToggle').show();
    }
});

