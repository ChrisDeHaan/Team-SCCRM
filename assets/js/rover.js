
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// MARS ROVER PAGE //
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// ELEMENTS
galleryEl = $('#rover-gallery-display');
roverSelectEl = $('#rover-select')
cameraSelectEl = $('#rover-cam-select')
solDateEl = $('#rover-sol-input')
searchButtonEl = $('#rover-search')
camFilterEl = $('#rover-cam-filter')

// API CALL
function fetchRoverPhotos(rover, solDate) {
    const apiKey = 'kQeFd8fXdPz7FZR4IshISXPpTJ7ZjB6Wo9gfxrpr';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}&sol=${solDate}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.photos)
}

// The camera select dropdown is populated with cameras from the current rover's mission manifest
function updateCameraSelect(cameras) {
    cameraSelectEl.empty()
    cameraSelectEl.append(`<option>Select a Camera</option>`)
    cameras.forEach(camera => {
        cameraSelectEl.append(`<option value="${camera.name}">${camera.full_name}</option>`)
    });
}

// An image card is created and labeled for each photo in the return
function createImageCards(photos) {
    galleryEl.empty();
    photos.forEach(photo => {
        galleryEl.append(`
            <div id="rover-image-card" data-camera="${photo.camera.name}" class="rover-image-card card h-50" style="width: 20rem; height: 50%">
                <img src="${photo.img_src}" class="card-img-top" style="object-fit: cover; overflow: auto;">
                    <div class="card-body">
                        <p id="card-camera" class="card-text">Camera: ${photo.camera.name}</p>
                        <p class="card-text">Earth Date: ${photo.earth_date}</p>
                    </div>
            </div>
        `);
    });
}

$(document).ready(function() {
    searchButtonEl.on('click', function() {
        
        fetchRoverPhotos(roverSelectEl.val(), solDateEl.val())
            .then(photos => {
                updateCameraSelect(photos[0].rover.cameras);
                createImageCards(photos);
                camFilterEl.removeClass('d-none');
            });
    });

    // Gallery is filtered based on currently selected camera
    cameraSelectEl.on('input', function() {
        const selectedFilter = $(this).children('option:selected').val();
        $('.rover-image-card').each(function() {
            const cardCamera = $(this).data('camera');
            $(this).toggle(cardCamera === selectedFilter);
        });
    });
});