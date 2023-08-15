// Listens for click and toggles the hidden class for associated ID to navigate to
document.addEventListener("DOMContentLoaded", function() {
    const imageMapAreas = document.querySelectorAll("area");

    imageMapAreas.forEach(area => {
        area.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href").substring(1);
            const targetCard = document.getElementById(targetId);

            if (targetCard) {
                targetCard.classList.toggle("hidden"); 
            }
        });
    });
});

// When screen adjusts below 951px the class of hidden is removed and bios are displayed
function handleScreenSize() {
    var screenSize = window.innerWidth;
    var hiddenElements = document.querySelectorAll('.hidden');

    hiddenElements.forEach(function(element) {
        if (screenSize < 1018) {
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



