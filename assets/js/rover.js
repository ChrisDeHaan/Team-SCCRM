
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

// API CALL
function searchRover() {

    // The Mars Rover API is called with query parameters set by user-selected options on the page.
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSelectEl.val()}/photos?api_key=kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr&sol=${solDateEl.val()}&camera=${cameraSelectEl.val()}`)
        .then(response => {return response.json();})
        .then(response => {
            console.log(response);

            // The image gallery is emptied for repopulation.
            galleryEl.empty();

            // A card is created for each photo in the response
            // and added to the gallery.
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
    searchButtonEl.on('click', searchRover)

})