document.addEventListener("DOMContentLoaded", function() {
    const imageMapAreas = document.querySelectorAll("area");

    imageMapAreas.forEach(area => {
        area.addEventListener("click", function(event) {

            console.log("I was clicked")

            const targetId = this.getAttribute("href").substring(1);
            const targetCard = document.getElementById(targetId);

            console.log(targetId)

            if (targetCard) {
                targetCard.classList.toggle("hidden"); 
            }
        });
    });
});


function handleScreenSize() {
    var screenSize = window.innerWidth;
    var hiddenElements = document.querySelectorAll('.hidden');

    hiddenElements.forEach(function(element) {
        if (screenSize < 951) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

// Call the function initially and on window resize
window.addEventListener('resize', handleScreenSize);

// Call the function when the page is fully loaded
window.addEventListener('load', handleScreenSize);



