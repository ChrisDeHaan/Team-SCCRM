
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// MARS ROVER PAGE //
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// ELEMENTS
const galleryEl = $('#rover-gallery-display');
const roverSelectEl = $('#rover-select');
const cameraSelectEl = $('#rover-cam-select');
const solDateEl = $('#rover-sol-input');
const searchButtonEl = $('#rover-search');
const camFilterEl = $('#rover-cam-filter');
const perseveranceLearnEl = $('#perseverance-learn')
const curiosityLearnEl = $('#curiosity-learn')
const opportunityLearnEl = $('#opportunity-learn')
const spiritLearnEl = $('#spirit-learn')


// PHOTO API CALL
function fetchRoverPhotos(rover, solDate) {
    const apiKey = 'kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}&sol=${solDate}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.photos
        })
}


// CAMERA MANIFEST API CALL
function fetchCameraManifest(rover, solDate) {
    const apiKey = 'kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const manifestEntry = data.photo_manifest.photos.find(photo => photo.sol == solDate);
            const cameraList = manifestEntry.cameras;
            return cameraList;
        });
}


// ROVER DETAILS CALL
function fetchRoverDetails(rover) {
    const apiKey = 'kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            roverDetails = data.photo_manifest;
            return roverDetails
        })
}


// The rover's "Learn More" card is populated with details from the call
// landing_date: "2021-02-18"
// launch_date: "2020-07-30"
// max_date: "2023-08-13"
// max_sol: 882
// name: "Perseverance"
// status: "active"
// total_photos: 174324
function wouldYouLikeToKnowMore(rover) {
    learnMoreEl = $(`#rover-details`);
    fetchRoverDetails(rover)
        .then(roverDetails => {
            solDateEl.attr('placeholder', `Enter Sol Date (Max Sol: ${roverDetails.max_sol})`)
            learnMoreEl.empty();
            learnMoreEl.append(`
            <p class="col-12 col-md-6 col-xl-3">Launch Date: ${roverDetails.launch_date}</p>
            <p class="col-12 col-md-6 col-xl-3">Landing Date: ${roverDetails.landing_date}</p>
            <p class="col-12 col-md-6 col-xl-3">Mission Status: ${roverDetails.status}</p>
            `)
            maxDate = roverDetails.max_sol;
            return maxDate;
        })
}


// The camera select dropdown is populated with cameras from a list
function updateCameraSelect(cameraList) {
    cameraSelectEl.empty()
    cameraSelectEl.append(`<option>Select a Camera</option>`)
    cameraList.forEach(camera => {
        cameraSelectEl.append(`<option value="${camera}">${camera}</option>`)
    });
}


// An image card is created and labeled for each photo in the return
function createImageCards(photos) {
    galleryEl.empty();
    photos.forEach(photo => {
        galleryEl.append(`
            <a href="${photo.img_src}" target="_blank" id="rover-image-card" data-camera="${photo.camera.name}" class="rover-image-card card overflow-hidden col-12 col-sm-6 col-md-4 col-lg-3" style="height: 50%">
                <img src="${photo.img_src}" class="card-img-top overflow-hidden" style="object-fit:cover; overflow: hidden;">
                <div class="card-body">
                    <p id="card-camera" class="card-text">Camera: ${photo.camera.name}</p>
                    <p class="card-text">Earth Date: ${photo.earth_date}</p>
                </div>
            </a>
        `);
    });
}


// An error message is displayed in the gallery container
function errorLog(error) {
    galleryEl.empty();
    galleryEl.append(`
        <div id="rover-error" class="card overflow-hidden col-12 col-sm-6 col-md-4 col-lg-3" style="height: 50%; overflow:auto;">
            <img src="assets/images/rover_error.jpg" class="card-img-top overflow-hidden" style="object-fit:cover">
            <div class="card-body">
                <h3 class="card-text">ERROR:</h3>
                <p class="card-text fs-5">${error}</p>
            </div>
        </div>
    `)
}


// .ready handles all input events on the page
$(document).ready(function() {

    // Learn More buttons pass input to rover dropdown menu
    perseveranceLearnEl.on('click', function() {roverSelectEl.val('perseverance').trigger('input');})
    curiosityLearnEl.on('click', function() {roverSelectEl.val('curiosity').trigger('input');})
    spiritLearnEl.on('click', function() {roverSelectEl.val('spirit').trigger('input');})
    opportunityLearnEl.on('click', function() {roverSelectEl.val('opportunity').trigger('input');})
    roverSelectEl.on('input', function(rover) {
        rover = roverSelectEl.val();
        wouldYouLikeToKnowMore(rover);
    })


    searchButtonEl.on('click', function() {
        rover = roverSelectEl.val();
        solDate = solDateEl.val();
        fetchRoverPhotos(rover, solDate)
            .then(photos => {
                createImageCards(photos);
                camFilterEl.removeClass('d-none');
                if (solDate > maxDate) {errorLog('You exceeded the max sol date!')}
            });
        fetchCameraManifest(rover, solDate)
            .then(cameraList => {
                updateCameraSelect(cameraList)
            })
    });


    // Gallery is filtered based on currently selected camera
    cameraSelectEl.on('input', function() {
        const selectedFilter = $(this).children('option:selected').val();
        $('.rover-image-card').each(function() {
            const cardCamera = $(this).data('camera');
            $(this).toggle(cardCamera === selectedFilter);//If true, show. If false, hide.
        });
    });
});