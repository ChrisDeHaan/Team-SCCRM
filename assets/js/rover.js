
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

// CAMERA ARRAYS
                // Perseverance Cameras
const psvCam = [];
                // Curiosity Cameras
const curCam = [];
                // Opportunity Cameras
const oppCam = [];
                // Spirit Cameras
const sprCam = [];

// API CALL
function searchRover() {

    // The Mars Rover API is called with query parameters set by user-selected options on the page.
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSelectEl.val()}/photos?api_key=kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr&sol=${solDateEl.val()}`)
        .then(response => {return response.json();})
        .then(response => {
            photos = response.photos
            console.log(response.photos);
            console.log(response)
            // The image gallery is emptied for repopulation.
            galleryEl.empty();

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

// camera: {id: 20, name: 'FHAZ', rover_id: 5, full_name: 'Front Hazard Avoidance Camera'}
// earth_date: "2015-05-30"
// id: 102693
// img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG"
// rover: {id: 5, 
//         name: 'Curiosity', 
//         landing_date: '2012-08-06', 
//         launch_date: '2011-11-26', 
//         status: 'active',}
// sol: 1000