var apodAPI = "Vza1e8P163wmIHjDfOB9nY3xwLOj4UbPCa679IcB"
var currentDayApod = `https://api.nasa.gov/planetary/apod?api_key=${apodAPI}`
var randomDayApod = `https://api.nasa.gov/planetary/apod?api_key=${apodAPI}&count=1`

// element variables for api APOD
var apodDate = document.getElementById('currentApodDate')
var apodImg = document.getElementById('currentApodImg')
var apodExplanation = document.getElementById('explanationApod')
var apodTitle = document.getElementById('currentApodTitle')
var apodCopyright = document.getElementById('currentApodCopyright')

// currentDayCall(currentDayApod)

//function to load the current day's APOD
function currentDayCall (api) {
    fetch(api)
    .then(response => response.json())
    .then(data => {
        apodDate.textContent = `${data.date.slice(5,10)}-${data.date.slice(0,4)}` //rearrange the date
        apodImg.src = data.hdurl
        apodTitle.textContent = data.title
        apodExplanation.textContent = data.explanation
        // var url = data.url (we'll be using this for the saved images, i think)
        var copyright = data.copyright
        //if statement for when copyright isn't present in api call
        if (copyright === undefined) {
            copyright =''
        } else {
            //regex for removing line breaks from the copyright string in the API
            copyright = copyright.replace(/(\r\n|\n|\r)/gm, "").replace(/(\/)/gm, "- ")
            document.getElementById('currentApodCopyright').textContent = copyright
        }
    })
}

function randomDayCall (api) {
    fetch(api)
    .then(response => response.json())
    .then(data => {
        apodDate.textContent = `${data[0].date.slice(5,10)}-${data[0].date.slice(0,4)}` //rearrange the date
        apodImg.src = data[0].hdurl
        apodTitle.textContent = data[0].title
        apodExplanation.textContent = data[0].explanation
        // var url = data[0].url (we'll be using this for the saved images, i think)
        var copyright = data[0].copyright
        //if statement for when copyright isn't present in api call
        if (copyright === undefined) {
            copyright =''
        } else {
            //regex for removing line breaks from the copyright string in the API
            copyright = copyright.replace(/(\r\n|\n|\r)/gm, "").replace(/(\/)/gm, "- ")
            document.getElementById('currentApodCopyright').textContent = copyright
        }
    })
}

var apodDiv = document.getElementById('currentApodImg')
apodDiv.addEventListener("click", () => {
    randomDayCall(randomDayApod)
})

// for testing purposes
// function test (api) {
//     fetch(api).then(response=>response.json()).then(data=>console.log(data))
// }
