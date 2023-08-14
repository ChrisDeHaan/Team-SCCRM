document.addEventListener("DOMContentLoaded", function() {
    const imageMapAreas = document.querySelectorAll("area");

    imageMapAreas.forEach(area => {
        area.addEventListener("click", function(event) {

            console.log("I was clicked")

            const targetId = this.getAttribute("href").substring(1);
            const targetCard = document.getElementById(targetId);

            console.log(targetId)

            if (targetCard) {
                targetCard.classList.toggle("hidden"); // Toggle the "hidden" class
            }
        });
    });
});
