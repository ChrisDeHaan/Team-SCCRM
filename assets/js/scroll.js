var width = $(innerWidth)
var scrollPos = window.scrollY
// var showToggle = $(window)

$(window).scroll(function() {
    showToggle();
    if ($(window).scrollTop() > 50) {
        $('#navToggle').hide();
    }
    // else {
    //     if (window.width < 900){
    //         $('#navToggle').show();
    // //     // if ($(innerWidth) < 980 && $(window).scrollTop() > 50)
    // //     $('#navToggle').show();
    //     }
    // }
    return;
});

function showToggle(){
    if (window.width < 900){
        $('#navToggle').show();
    }
}
