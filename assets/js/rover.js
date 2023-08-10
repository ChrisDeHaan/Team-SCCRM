
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
camFilterEl = $('#rover-cam-filter')

// API CALL
function searchRover() {

    // The Mars Rover API is called with query parameters set by user-selected options on the page.
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSelectEl.val()}/photos?api_key=kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr&sol=${solDateEl.val()}`)
        .then(response => {return response.json();})
        .then(response => {
            photos = response.photos;
            cameras = photos[0].rover.cameras;
            cameraSelectEl.empty();
            galleryEl.empty();

            // Cameras for the currently selected rover are added to a dropdown menu
            camFilterEl.removeClass('d-none');
            for (var i = 0; i < cameras.length; i++) {
                cameraSelectEl.append(`<option value=${cameras[i].name}>${cameras[i].full_name}</option>`)
            }

            // A card is created for each photo in the response
            // and added to the gallery.
            for (var i = 0; i < photos.length; i++) {
                galleryEl.append(`
                <div id="rover-image-card" class="card" style="width: 20rem;">
                    <img src="${photos[i].img_src}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text">Camera: ${photos[i].camera.name}</p>
                            <p class="card-text">Earth Date: ${photos[i].earth_date}</p>
                        </div>
                </div>`)
            }
        })
}


$(document).ready(function () {
    searchButtonEl.on('click', searchRover)

})