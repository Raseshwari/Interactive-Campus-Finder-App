function browserDetect() {
    var notSupportedBrowser = false;
    var browserName = BrowserDetect.browser;
    var browserVersion = BrowserDetect.version;

    if (browserName === 'Explorer' && browserVersion < 11) {
        notSupportedBrowser = true;
    } else if (browserName == 'Chrome' && browserVersion < 67) {
        notSupportedBrowser = true;
    } else if (browserName == 'Firefox' && browserVersion < 60) {
        notSupportedBrowser = true;
    }

    if (notSupportedBrowser) {
        var browserErr = document.getElementById("browser-detect");
        var browErrDiv = document.createElement("div");
        var textEle = document.createTextNode("Browser Not Supported!! You will be re-directed to Chrome download page")
        browserErr.appendChild(textEle);
        browserErr.setAttribute("class", "errDiv");

        document.getElementById("switch-data").addEventListener("submit", function(e){
            e.stopPropagation();
            e.preventDefault();
        })

        document.getElementById("switch-data").addEventListener("click", function(e){
            e.stopPropagation();
            e.preventDefault();
        })

        setTimeout(function () {
            window.location = "https://www.google.com/chrome/?brand=CHBD&gclid=EAIaIQobChMIvoTwkuOa5QIVUuDICh18YAAbEAAYASABEgKbofD_BwE&gclsrc=aw.ds";
        }, 1000);
    }
}