
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


// Rover details are displayed on the page
function wouldYouLikeToKnowMore(rover) {
    learnMoreEl = $(`#rover-details`);
    fetchRoverDetails(rover)
        .then(roverDetails => {
            maxDate = roverDetails.max_sol;
            const launchDate = dayjs(roverDetails.launch_date).format('MM/DD/YYYY');
            const landingDate = dayjs(roverDetails.landing_date).format('MM/DD/YYYY');
            // The maximum sol date is displayed in the date search form
            solDateEl.attr('placeholder', `Enter Sol Date (Max Sol: ${roverDetails.max_sol})`);
            learnMoreEl.empty();
            learnMoreEl.append(`
            <p class="col-12 col-md-6 col-xl-3 mb-0">Launch Date: ${launchDate}</p>
            <p class="col-12 col-md-6 col-xl-3 mb-0">Landing Date: ${landingDate}</p>
            <p class="col-12 col-md-6 col-xl-3 mb-0">Mission Status: ${roverDetails.status}</p>
            `);
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


// A loading indicator is displayed in the gallery
function reticulatingSplines() {
    galleryEl.empty();
    galleryEl.append(`
    <i class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
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


    // The search button populates the gallery and camera selector
    searchButtonEl.on('click', function() {
        reticulatingSplines(); //Loading...
        rover = roverSelectEl.val();
        solDate = solDateEl.val();
        fetchRoverPhotos(rover, solDate)
            .then(photos => {
                console.log(photos)
                createImageCards(photos);
                camFilterEl.removeClass('d-none');
                // An error message is displayed for bad calls.
                if (photos.length === 0) {errorLog(`${rover} took no photos on sol date ${solDate}!`)}
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