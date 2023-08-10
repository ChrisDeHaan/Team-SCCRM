var apodAPI = "Vza1e8P163wmIHjDfOB9nY3xwLOj4UbPCa679IcB"

//function to load the current day's APOD
function test () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apodAPI}`)
    .then(response => response.json())
    .then(data => {
        var date = `${data.date.slice(5,10)}-${data.date.slice(0,4)}` //rearrange the date
        var hdURL = data.hdurl
        // var url = data.url (we'll be using this for the saved images, i think)
        var title = data.title
        var copyright = data.copyright
        var explanation = data.explanation

        //if statement for when copyright isn't present in api call
        if (copyright === undefined) {
            copyright =''
        } else {
            //regex for removing line breaks from the copyright string in the API
            copyright = copyright.replace(/(\r\n|\n|\r)/gm, "").replace(/(\/)/gm, "- ")
            document.getElementById('currentApodCopyright').textContent = copyright
        }
        document.getElementById('currentApodDate').textContent = date
        document.getElementById('currentApodImg').src = hdURL
        document.getElementById('explanationApod').textContent = explanation
        document.getElementById('currentApodTitle').textContent = title
        document.getElementById('currentApodCopyright').textContent = copyright
    })
}

test()

