
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// MARS ROVER PAGE //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// API KEY
// kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr

// ELEMENTS
galleryEl = $('#rover-gallery-display');
roverSelectEl = $('#rover-select')
cameraSelectEl = $('#rover-cam-select')
solDateEl = $('#rover-sol-input')
searchButtonEl = $('#rover-search')

// ELEMENT TEMPLATES
galleryCardEl = `<div id="rover-image-card" class="card" style="width: 20rem;">
                    <img src="assets/images/rover_image_placeholder.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Image: Camera</p>
                        </div>
                </div>`;

// API CALL

function fetchRover() {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSelectEl.val()}/photos?api_key=kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr&sol=${solDateEl.val()}&camera=${cameraSelectEl.val()}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            galleryEl.empty();

            // A card is created for each photo in the response
            for (var i = 0; i < response.photos.length; i++) {
                galleryEl.append(`
                <div id="rover-image-card" class="card" style="width: 20rem;">
                    <img src="${response.photos[i].img_src}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text">Image: Camera</p>
                        </div>
                </div>`)
            }
        })
}




$(document).ready(function () {

    searchButtonEl.on('click', fetchRover)

})