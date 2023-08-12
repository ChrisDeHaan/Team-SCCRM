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


// currentDayCall(currentDayApod) // load the current day's APOD on page load

// Event Listeners
var apodDiv = document.getElementById('currentApodImg') // random day listener
apodDiv.addEventListener("click", () => {
    randomDayCall(randomDayApod)
})

var yearSelectEl = document.getElementById('year-select') // search div listeners
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
        if (monthSelectEl.length !== Number(currentMonthNumbers)) {
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
    // first, check for leap years and populates to 29 days
    if (monthSelectEl.value === 'Feb' && (yearSelectEl.value === '2024' || yearSelectEl.value === '2020' ||
        yearSelectEl.value === '2016' || yearSelectEl.value === '2012' || yearSelectEl.value === '2008' ||
        yearSelectEl.value === '2004' || yearSelectEl.value === '2000' || yearSelectEl.value === '1996')) {
        if (daySelectEl.length !== 30) {
            dynamicDays(1, 30)
        } else { return }; // this is used to not repopulate the list if it already has the correct number of days
    // second, check for first year and month of APOD
    } else if (yearSelectEl.value === '1995' && monthSelectEl.value === 'Jun') {
        if (daySelectEl.length !== 13) { //can't use dynamic days because there is a gap from 16th to 20th
            daySelectEl.innerHTML = `<option selected>Day</option><option selected>16</option>`
            for ( i = 20; i < 31; i++) {
                daySelectEl.innerHTML += `
                <option>${i}</option>
                `
            }
        } else { return }     
    // third, check for current year & month
    } else if (yearSelectEl.value === currentYear && monthSelectEl.value === currentMonthLetters) {
        if (daySelectEl.length !== daysInCurrentMonth) {
            dynamicDays(1, daysInCurrentMonth)
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
        if (daySelectEl.length !== 32){
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

function currentDayCall(api) { // function to load the current day's APOD
    fetch(api)
        .then(response => response.json())
        .then(data => {
            apodDateEl.textContent = `${data.date.slice(5, 10)}-${data.date.slice(0, 4)}` // rearrange the date
            apodImgEl.src = data.hdurl
            apodTitleEl.textContent = data.title
            apodExplanationEl.textContent = data.explanation
            // var url = data.url (we'll be using this for the saved images, i think)
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
    fetch(api)
        .then(response => response.json())
        .then(data => {
            apodDateEl.textContent = `${data[0].date.slice(5, 10)}-${data[0].date.slice(0, 4)}` // rearrange the date
            apodImgEl.src = data[0].hdurl
            apodTitleEl.textContent = data[0].title
            apodExplanationEl.textContent = data[0].explanation
            // var url = data[0].url (we'll be using this for the saved images, i think)
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

function dynamicDays (x, length) { // function used to populate the days dropdown list
    daySelectEl.innerHTML = `<option selected>Day</option>`
    for (i = x; i < length; i++) {
        daySelectEl.innerHTML += `
        <option>${i}</option>
        `
    }
}

function dynamicMonths (x, length) { // function used to populate the months dropdown list
    monthSelectEl.innerHTML = `<option selected>Month</option>`
    for ( i = x ; i < length; i++) {
        monthSelectEl.innerHTML += `
        <option>${monthArray[i]}</option>
        `
    }
}

function disableAttrAdd (element) { // function used to add the disabled attribute
    element.setAttribute('disabled', '')
}

function disableAttrRemove (element) { //function used to remove the disabled attribute
    element.removeAttribute('disabled')
}
// for testing purposes
// function test (api) {
//     fetch(api).then(response=>response.json()).then(data=>console.log(data))
// }

// var searchTerm = 'May' (these are likely to be used with the values)
// var indexValue = testArray.indexOf(searchTerm);