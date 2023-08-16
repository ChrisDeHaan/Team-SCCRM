var apodAPI = "Vza1e8P163wmIHjDfOB9nY3xwLOj4UbPCa679IcB"
var currentDayApod = `https://api.nasa.gov/planetary/apod?api_key=${apodAPI}`
var randomDayApod = `https://api.nasa.gov/planetary/apod?api_key=${apodAPI}&count=1`
var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// dayjs to get the current year and days in current month
var today = dayjs();
var parseDate = today.format('YYYY DD MMM MM');
var currentYear = parseDate.slice(0, 4)
var currentMonthLetters = parseDate.slice(8, 11)
var currentMonthNumbers = parseDate.slice(12, 14)
var daysInCurrentMonth = Number(parseDate.slice(5, 7))

// element variables for api APOD
var apodDateEl = document.getElementById('currentApodDate')
var apodImgEl = document.getElementById('currentApodImg')
var apodExplanationEl = document.getElementById('explanationApod')
var apodTitleEl = document.getElementById('currentApodTitle')
var apodCopyrightEl = document.getElementById('currentApodCopyright')
var apodContainerEl = document.getElementById('apodContainer')

currentDayCall(currentDayApod) // load the current day's APOD on page load

// Event Listeners
var apodDiv = document.getElementById('currentApodImg') // random day listener elements

apodContainerEl.addEventListener("click", () => {
    randomDayCall(randomDayApod)
})

var yearSelectEl = document.getElementById('year-select') // dropdown/search div listener elements
var monthSelectEl = document.getElementById('month-select')
var daySelectEl = document.getElementById('day-select')
var searchBtnEl = document.getElementById('search-button')
var saveBtnEl = document.getElementById('save-button')

yearSelectEl.addEventListener('click', () => { // populates year
    if (yearSelectEl.length < 2) {
        yearSelectEl.innerHTML = `<option selected>Year</option>`
        for (i = Number(currentYear); i > 1994; i--) {
            yearSelectEl.innerHTML += `
        <option>${i}</option>
        `
        }
    } else { return };
})

monthSelectEl.addEventListener('click', () => { // populates month
    // first, check for beginning year
    if (yearSelectEl.value === '1995') {
        if (monthSelectEl.length !== 8) {
            dynamicMonths(5, 12)
        } else { return }
        // second, check for current year
    } else if (yearSelectEl.value === currentYear) {
        var tempNum = Number(currentMonthNumbers) + 1 // need the length +1 to include the option with 'Month'
        if (monthSelectEl.length !== Number(tempNum)) {
            dynamicMonths(0, Number(currentMonthNumbers))
        } else { return }
        // all other months will just have all 12 months
    } else {
        if (monthSelectEl.length !== 13) {
            dynamicMonths(0, 12)
        } else { return }
    }
})

daySelectEl.addEventListener('click', () => { // populates days
    // first, check for leap years
    if (monthSelectEl.value === 'Feb' && (yearSelectEl.value % 4) === 0) {
        if (daySelectEl.length !== 30) {
            dynamicDays(1, 30)
        } else { return }; // this is used to not repopulate the list if it already has the correct number of days
        // second, check for first year and month of APOD
    } else if (yearSelectEl.value === '1995' && monthSelectEl.value === 'Jun') {
        if (daySelectEl.length !== 13) { // can't use dynamic days because there is a gap from 16th to 20th
            daySelectEl.innerHTML = `<option selected>Day</option><option>16</option>`
            for (i = 20; i < 31; i++) {
                daySelectEl.innerHTML += `
                <option>${i}</option>
                `
            }
        } else { return }
        // third, check for current year & month
    } else if (yearSelectEl.value === currentYear && monthSelectEl.value === currentMonthLetters) {
        if (daySelectEl.length !== (daysInCurrentMonth + 1)) {
            dynamicDays(1, (daysInCurrentMonth + 1)) // needs to be +1 to account for option 'Day'
        } else { return }
        // fourth, check for feb
    } else if (monthSelectEl.value === 'Feb') {
        if (daySelectEl.length !== 29) {
            dynamicDays(1, 29)
        } else { return }
        // fifth, check for months with 30 days
    } else if (monthSelectEl.value === 'Apr' || monthSelectEl.value === 'Jun' ||
        monthSelectEl.value === 'Sep' || monthSelectEl.value === 'Nov') {
        if (daySelectEl.length !== 31) {
            dynamicDays(1, 31)
        } else { return }
        // sixth, check for months with 31 days
    } else if (monthSelectEl.value === 'Jan' || monthSelectEl.value === 'Mar' || monthSelectEl.value === 'May' ||
        monthSelectEl.value === 'Jul' || monthSelectEl.value === 'Aug' || monthSelectEl.value === 'Oct' ||
        monthSelectEl.value === 'Dec') {
        if (daySelectEl.length !== 32) {
            dynamicDays(1, 32)
        } else { return }
    }
})

yearSelectEl.addEventListener('change', (e) => { // removes/applies disabled attribute based on year
    if (e.target.value !== 'Year') {
        disableAttrRemove(monthSelectEl)
        monthSelectEl.value = 'Month'
        disableAttrAdd(searchBtnEl)
    } else {
        disableAttrAdd(monthSelectEl)
        disableAttrAdd(daySelectEl)
        disableAttrAdd(searchBtnEl)
    }
})

monthSelectEl.addEventListener('change', () => { // removes/applies disabled attribute based on month
    if (monthSelectEl.value !== 'Month') {
        disableAttrRemove(daySelectEl)
        daySelectEl.value = 'Day'
        disableAttrAdd(searchBtnEl)
    } else {
        disableAttrAdd(daySelectEl)
        disableAttrAdd(searchBtnEl)
    }
})

daySelectEl.addEventListener('change', (e) => { // removes/applies disabled attribute based on day
    if (e.target.value !== 'Day') {
        disableAttrRemove(searchBtnEl)
    } else {
        disableAttrAdd(searchBtnEl)
    }
})

searchBtnEl.addEventListener('click', () => { // loads the selected date's APOD
    var Year = yearSelectEl.value
    var Day = daySelectEl.value
    var Month = monthSelectEl.value
    Month = (monthArray.indexOf(Month) + 1).toString(); // need to turn our MMM into MM using its' position in the array
    var specificDayApod = `https://api.nasa.gov/planetary/apod?api_key=${apodAPI}&date=${Year}-${Month}-${Day}`
    currentDayCall(specificDayApod)
})

// variables for save functions
var savedPicturesStorage = localStorage.getItem('saved-pictures')
var savedPicturesArray = JSON.parse(savedPicturesStorage) || []
var imgGalleryEl = document.getElementById('img-Gallery')
displaySavedImages(savedPicturesArray) // display gallery on page load

saveBtnEl.addEventListener('click', () => {
    savedPicturesArray.push({
        HDUrl: apodContainerEl.children[0].src,
        date: apodDateEl.textContent,
        title: apodTitleEl.textContent,
        copyright: apodCopyrightEl.textContent,
    })

    localStorage.setItem('saved-pictures', JSON.stringify(savedPicturesArray))

    displaySavedImages(savedPicturesArray)
})

//variable for clearing localStorage
var clearBtnEl = document.getElementById('clearStorage')

clearBtnEl.addEventListener("click", () => { // deletes all items in localStorage
    localStorage.clear()
    displaySavedImages()
    savedPicturesArray = []
    return savedPicturesArray
})

function currentDayCall(api) { // function to load the current day's APOD
    apodContainerEl.innerHTML = `<i class="spinner-border" style="width: 10rem; height: 10rem;" role="status">`
    fetch(api)
        .then(response => response.json())
        .then(data => {
            var imageSrc
            if (data.hdurl === undefined) {
                imageSrc = "./assets/images/404.jpg"
            } else {
                imageSrc = data.hdurl
            }
            apodDateEl.textContent = `${data.date.slice(5, 10)}-${data.date.slice(0, 4)}` // rearrange the date
            displayApodDiv(imageSrc)
            apodTitleEl.textContent = data.title
            apodExplanationEl.textContent = data.explanation
            var copyright = data.copyright
            // if statement for when copyright isn't present in api call
            if (copyright === undefined) {
                copyright = ''
            } else {
                // regex for removing line breaks from the copyright string in the API
                copyright = copyright.replace(/(\r\n|\n|\r)/gm, "").replace(/(\/)/gm, "- ")
                document.getElementById('currentApodCopyright').textContent = copyright
            }
        })
}

function randomDayCall(api) { // function for random APODs
    apodContainerEl.innerHTML = `<i class="spinner-border" style="width: 10rem; height: 10rem;" role="status">`
    fetch(api)
        .then(response => response.json())
        .then(data => {
            var imageSrc
            if (data[0].hdurl === undefined) {
                imageSrc = "./assets/images/404.jpg"
            } else {
                imageSrc = data[0].hdurl
            }
            apodDateEl.textContent = `${data[0].date.slice(5, 10)}-${data[0].date.slice(0, 4)}` // rearrange the date
            displayApodDiv(imageSrc)
            apodTitleEl.textContent = data[0].title
            apodExplanationEl.textContent = data[0].explanation
            var copyright = data[0].copyright
            // if statement for when copyright isn't present in api call
            if (copyright === undefined) {
                copyright = ''
            } else {
                // regex for removing line breaks from the copyright string in the API
                copyright = copyright.replace(/(\r\n|\n|\r)/gm, "").replace(/(\/)/gm, "- ")
                apodCopyrightEl.textContent = copyright
            }
        })
}

function dynamicDays(x, length) { // function used to populate the days dropdown list
    daySelectEl.innerHTML = `<option selected>Day</option>`
    for (i = x; i < length; i++) {
        daySelectEl.innerHTML += `
        <option>${i}</option>
        `
    }
}

function dynamicMonths(x, length) { // function used to populate the months dropdown list
    monthSelectEl.innerHTML = `<option selected>Month</option>`
    for (i = x; i < length; i++) {
        monthSelectEl.innerHTML += `
        <option>${monthArray[i]}</option>
        `
    }
}

function disableAttrAdd(element) { // function used to add the disabled attribute
    element.setAttribute('disabled', '')
}

function disableAttrRemove(element) { // function used to remove the disabled attribute
    element.removeAttribute('disabled')
}

function displayApodDiv (image) { // need this to redisplay the APOD image
    apodContainerEl.innerHTML = `
    <img src=${image} alt='Astronomy Picture of the Day' class="img-fluid border-custom"
        id="currentApodImg">
    <div class="hover-effects">
        <p class="w-100 h-100 h3">Click here for a random APOD!</p>
    </div>
    `
}

function displaySavedImages(array) {
    if (array !== undefined) { // need this is in order to reset Gallery after deleting localStorage
        imgGalleryEl.innerHTML = '' // reset the Gallery
        for (i = (array.length - 1); i >= 0; i--) {
            imgGalleryEl.innerHTML += `
        <div class="col-12 col-md-6 mx-auto my-3">
            <div class="h5">${array[i].date}</div>
            <a href=${array[i].HDUrl}
                target="_blank">
                <img src=${array[i].HDUrl}
                    class="w-100 border-custom apod-img-custom bg-light">
            </a>
            <figcaption class="mt-2 h4">${array[i].title}</figcaption>
            <figcaption class="mt-2">${array[i].copyright}</figcaption>
        </div>
        `
        }
    } else {
        imgGalleryEl.innerHTML = ''
    }
}