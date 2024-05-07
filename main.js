var stopped = false;
const linkRegex = 'href=".*"';
var scrapeToComplete = 0;

function onSubmit() {
    document.getElementById("startButton").setAttribute("disabled", true)
    console.log("submitted")
    if (document.getElementById("word").value != "" &&
        document.getElementById("depth").value >= 0) {
        scrape(
            document.getElementById("inputUrl").value,
            document.getElementById("word").value,
            document.getElementById("depth").value,
            0
        )
    }

}

function onStop() {
    document.getElementById("stopButton").setAttribute("disabled", true)
    console.log("stopping");
    stopped = true;
}

async function scrape(url, word, maxDepth, currentDepth) {
    if (!stopped && currentDepth <= maxDepth) {
        fetch(url).then(async (response) => {
            if (!response.ok)
                updatePage(" Couldn't connet to page: " + url)
            else {
                response.text().then(async text => {
                    // write the occurrences of the word in the current page
                    var count = 0
                    for (const match of text.matchAll(word)) {
                        count++
                    }
                    if (count > 0)
                        updatePage(count + " occurrences of word \"" + word + "\" in url \"" + url + "\" at depth " + currentDepth)
                    return text
                }).then(text => {
                    // call scrape on all links in the current page
                    if (text.match(linkRegex) != null) {
                        if (currentDepth == (maxDepth - 1)) {
                            for (const match of text.matchAll(linkRegex)) {
                                scrapeToComplete ++
                            }
                            console.log(scrapeToComplete);
                        }
                        if (maxDepth == currentDepth) {
                            scrapeToComplete --
                            console.log(scrapeToComplete);
                            if (scrapeToComplete == 0)
                                updateEnd("Scrape completed!")
                        } else {
                            text.matchAll(linkRegex)
                                .forEach(regExpExecArray => {
                                    var stringMatched = regExpExecArray[0]
                                    var url = stringMatched.replace('href="', '')
                                    url = url.substring(0, url.length - 1)
                                    scrape(url, word, maxDepth, currentDepth + 1)
                                })
                        }
                    }
                })
            }
        });
    }
}

function updatePage(value)  {
    document.getElementById("end").innerText = value;
}

function updatePage(value)  {
    var ul = document.getElementById("results");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
}