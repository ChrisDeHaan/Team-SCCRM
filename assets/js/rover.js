
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

// ELEMENT TEMPLATES
galleryCardEl = `<div id="rover-image-card" class="card" style="width: 20rem;">
                    <img src="assets/images/rover_image_placeholder.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Image: Camera</p>
                        </div>
                </div>`;

// API CALL

$(document).ready(function () {

    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/
    curiosity/photos?api_key=kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr&sol=1000`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response.photos[0].img_src);
            galleryEl.empty();

            console.log(response.photos)
            for (var i = 0; i < response.photos.length; i++) {
                console.log(response.photos[i].img_src);
                galleryEl.append(`
                <div id="rover-image-card" class="card" style="width: 20rem;">
                    <img src="${response.photos[i].img_src}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text">Image: Camera</p>
                        </div>
                </div>`)
            }
        })
})