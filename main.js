function onSubmit() {
    document.getElementById("startButton").setAttribute("disabled", true)
    console.log("submitted")
    scrape(
        document.getElementById("inputUrl").value,
        document.getElementById("word").value,
        document.getElementById("depth").value,
        0
    )
}

function onStop() {
    document.getElementById("stopButton").setAttribute("disabled", true)
    console.log("stopping");
}

function scrape(url, word, maxDepth, currentDepth) {
    fetch(url).then(async (response) => {
        if (!response.ok)
            await updatePage(" Couldn't connet to page: " + url)
        else {
            var text = await response.text()
            console.log("scraping: " + text + "\n word: " + word + "\n depth: " + currentDepth)
            var index = text.indexOf(word)
            var count = 1
            while (index != -1) {
                console.log(index)
                updatePage(" Occurrence " + count + " of word " + word + " in url " + url)
                text = text.replace(word, "")
                index = text.indexOf(word)
                count++
            }
        }
    });
}

async function updatePage(value)  {
    var ul = document.getElementById("results");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
}