function onSubmit() {
    document.getElementById("startButton").setAttribute("disabled", true)
    console.log("submitted")
    scrape("https://www.op.gg/", "Draven", 3, 0)
}

function onStop() {
    document.getElementById("stopButton").setAttribute("disabled", true)
    console.log("stopping");
}

function scrape(url, word, maxDepth, currentDepth) {
    console.log("scraping: " + url)
    fetch(url)
        .then((response) => console.log(response.body.getReader().toString()));

    return true
}