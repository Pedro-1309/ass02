var stopped = false;

function onSubmit() {
    document.getElementById("startButton").setAttribute("disabled", true)
    console.log("submitted")
    if (document.getElementById("word").value != "" &&
        document.getElementById("depth").value >= 0)
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
    stopped = true;
}

async function scrape(url, word, maxDepth, currentDepth) {
    if (!stopped && currentDepth <= maxDepth)
        fetch(url).then((response) => {
            if (!response.ok)
                updatePage(" Couldn't connet to page: " + url)
            else {
                response.text().then(text => {
                    // call scrape on all links in the current page
                    console.log("scraping: " + text + "\n word: " + word + "\n depth: " + currentDepth)
                    console.log(
                        text.match('href=".*"').length
                    );
                    if (text.match('href=".*"') != null)
                        text.match('href=".*"')
                            .map(t => t.replace('href="', ''))
                            .map(t => t.substring(0, t.length - 1))
                            .forEach(t => scrape(t, word, maxDepth, currentDepth + 1))
                    // write the occurrences of the word in the current page
                    var textCopy = text
                    var index = textCopy.indexOf(word)
                    var count = 0
                    while (index != -1) {
                        count++
                        textCopy = textCopy.replace(word, "")
                        index = textCopy.indexOf(word)
                    }
                    if (count > 0)
                        updatePage(count + " occurrences of word \"" + word + "\" in url \"" + url + "\" at depth " + currentDepth)
                })
            }
        });
}

function updatePage(value)  {
    var ul = document.getElementById("results");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
}