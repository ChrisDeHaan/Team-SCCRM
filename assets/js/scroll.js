var width = $(innerWidth)
var scrollPos = document.documentElement.scrollTop || document.body.scrollTop
// var showToggle = $(window)

$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $('#navToggle').hide();
    }
    else {
        
        // if ($(innerWidth) < 980 && $(window).scrollTop() > 50)
        $('#navToggle').show();
    }
});

$(window).width(function(){
    if (window.width < 900 && scrollPos>50){
        $('#navToggle').show();

    }
})
