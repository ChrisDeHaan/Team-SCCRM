
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

// The camera select dropdown is populated with cameras from the current rover's mission manifest
function updateCameraSelect(cameras) {
    cameraSelectEl.empty()
    cameraSelectEl.append(`<option>Select a Camera</option>`)
    cameras.forEach(camera => {
        cameraSelectEl.append(`<option value="${camera}">${camera}</option>`)
    });
}

// An image card is created and labeled for each photo in the return
function createImageCards(photos) {
    galleryEl.empty();
    photos.forEach(photo => {
        galleryEl.append(`
            <a href="${photo.img_src}" target="_blank" id="rover-image-card" data-camera="${photo.camera.name}" class="rover-image-card card h-50" style="width: 18rem; height: 50%">
                <img src="${photo.img_src}" class="card-img-top" style="object-fit: cover; overflow: auto;">
                    <div class="card-body">
                        <p id="card-camera" class="card-text">Camera: ${photo.camera.name}</p>
                        <p class="card-text">Earth Date: ${photo.earth_date}</p>
                    </div>
            </a>
        `);
    });
}

$(document).ready(function() {
    searchButtonEl.on('click', function() {
        rover = roverSelectEl.val();
        solDate = solDateEl.val();
        fetchRoverPhotos(rover, solDate)
            .then(photos => {
                createImageCards(photos);
                camFilterEl.removeClass('d-none');
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
            $(this).toggle(cardCamera === selectedFilter);
        });
    });
});