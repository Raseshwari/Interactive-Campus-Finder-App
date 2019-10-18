"use strict";

var data; // global variable to hold data

var routeArr = []; // global variable to hold the route as per user selections

var selectCounter = 0; // global counter to maintain the count of select ele in DOM

var rootDiv = document.getElementById("root"); //global parent element to which all elements are appended as child

var switchData = false;
var viewHistory = JSON.parse(getFromLocalStorage("viewHistory"));

if (viewHistory) {
    var viewHistoryObjects = Object.keys(viewHistory);
}

var historyDiv = document.getElementById("recent-history");
var textNode = document.createTextNode("Test");

function getDataFromAjaxCall(url) {
    var http = new XMLHttpRequest();
    http.overrideMimeType("application/json");
    http.open('GET', url, true);
    http.setRequestHeader("Cache-Control", "no-cache");

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            initializeData(http.responseText);
        }
    };

    http.send(null);
}

function initializeData(responseData) {
    data = responseData;
    createSelectComponent(rootDiv, JSON.parse(data));
}

function getNestedValue(path) {
    var tempData = JSON.parse(data);

    for (var i = 0; i < path.length; i++) {
        tempData = tempData[path[i]];
    }

    return tempData;
}

function createSelectComponent(parentNode, data) {
    var div = document.createElement("div");
    var selectEle = document.createElement("select");
    selectEle.setAttribute("select_counter", selectCounter);
    selectEle.setAttribute("class", "custom-select");
    var questionEle = document.createElement("label");
    questionEle.setAttribute("class", "label label-default");
    questionEle.textContent = data.question;
    var textEle = document.createTextNode("Select from options");
    var optionEle = document.createElement("option");
    optionEle.setAttribute("selected", true);
    optionEle.setAttribute("disabled", "disabled");
    div.appendChild(questionEle);
    optionEle.appendChild(textEle);
    selectEle.appendChild(optionEle);

    if (typeof data == "object") {
        var objKeys = Object.keys(data);
        var objKeysLength = objKeys.length - 1;

        if (objKeys.indexOf("question") >= 0) {
            for (var i = 0; i < objKeysLength; i++) {
                optionEle = document.createElement("option");
                textEle = document.createTextNode(objKeys[i]);
                optionEle.appendChild(textEle);
                selectEle.appendChild(optionEle);
            }

            div.appendChild(selectEle);
            parentNode.appendChild(div);
        } else {
            console.log(routeArr, routeArr.join('<img src="./images/arrow.jpg"'))
            var resultDiv = document.createElement("div");
            var selectionResultDiv = document.createElement("div");
            var achorEleDiv = document.createElement("div");

            resultDiv.setAttribute("class", "result-div");
            selectionResultDiv.setAttribute("class","select-result")

            
            var selectResultTitle = document.createTextNode("Your choices ➣ ");
            var selectionResultValue = document.createTextNode(routeArr.join(' ➱ '));
            selectionResultDiv.appendChild(selectResultTitle);
            selectionResultDiv.appendChild(selectionResultValue);

            var anchorEle = document.createElement("a");
            anchorEle.setAttribute("href", data.link);
            anchorEle.setAttribute("target", "_blank");
            anchorEle.textContent = 'Best match for you ♥ ' + data.name;
            anchorEle.setAttribute("class", "anim-result");

            achorEleDiv.appendChild(anchorEle);
            resultDiv.appendChild(selectionResultDiv);
            resultDiv.appendChild(achorEleDiv);
            div.removeChild(div.firstChild);
            div.appendChild(resultDiv);
            parentNode.appendChild(div);
            addToLocalStorage(data);
            displayRecentViewed();


        }
    }

    if (selectEle) {
        selectEle.addEventListener("change", function (e) {
            var selectEleNo = parseInt(e.target.getAttribute("select_counter"));

            if (selectEleNo == selectCounter) {
                updateRouteArr(selectEleNo, e.target.value);
                updateDOM(div, selectEle, e.target.value, true);
            } else {
                updateRouteArr(selectEleNo, e.target.value);
                removeDOMElements(selectEle);
                var nestedObj = getNestedValue(routeArr);
                createSelectComponent(selectEle.parentNode, nestedObj);
            }
        });
    }
}

function displayRecentViewed() {
    var div = document.createElement("div");
    div.setAttribute("class", "anim-div");

    var viewHistory = JSON.parse(getFromLocalStorage("viewHistory")) || {};
    var key = Object.keys(viewHistory).length + 1;

    var resultAnchorEle = document.createElement("a");
    resultAnchorEle.setAttribute("href", viewHistory[key - 1].link);
    resultAnchorEle.setAttribute("target", "_blank");
    resultAnchorEle.textContent = viewHistory[key - 1].name
    resultAnchorEle.setAttribute("class", "result-anchor");

    div.appendChild(resultAnchorEle);
    historyDiv.appendChild(div);
}

function addToLocalStorage(data) {
    var viewHistory = JSON.parse(getFromLocalStorage("viewHistory")) || {};
    var key = Object.keys(viewHistory).length + 1;
    viewHistory[key] = data;
    setInLocalStorage("viewHistory", JSON.stringify(viewHistory));
}

function removeDOMElements(selectNode) {
    var childNodeLength = selectNode.parentNode.childNodes.length;

    for (var i = 2; i < childNodeLength; i++) {
        selectNode.parentNode.removeChild(selectNode.parentNode.lastChild);
    }

    decrementSelectCounter();
}

function removeAllDOMElements(selectNode) {
    var childNodesLength = selectNode.childNodes.length;

    for (var i = 0; i < childNodesLength; i++) {
        selectNode.removeChild(selectNode.lastChild);
    }
}

function updateRouteArr(index, value) {
    if (index !== getRouteArrLength()) {
        routeArr = routeArr.slice(0, index);
    }

    routeArr[index] = value;
}

function clearRouteArr() {
    routeArr = [];
}

function updateDOM(parentNode, selectEle, selectedValue, append) {
    if (append) {
        incrementSelectCounter();
        var nestedObj = getNestedValue(routeArr);
        createSelectComponent(parentNode, nestedObj);
    }
}

function getRouteArrLength() {
    return routeArr.length;
}

function decrementSelectCounter() {
    selectCounter = routeArr.length;
}

function incrementSelectCounter() {
    selectCounter += 1;
}

var switchButton = document.getElementById("switch-data");

if (switchButton) {
    switchButton.addEventListener("click", function (e) {
        // e.preventDefault();
        clearRouteArr();
        removeAllDOMElements(rootDiv);
        decrementSelectCounter(); //getDataFromAjaxCall('./data/actual_data.json');

        if (!switchData) {
            switchData = true;
            switchButton.style.background = "rgb(26,255,0)"
            getDataFromAjaxCall('./data/hopefully_final.json');
        } else {
            switchData = false;
            switchButton.style.background = "rgb(255,255,255)";
            getDataFromAjaxCall('./data/actual_data.json');
        }
    });
}

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
        document.body.style.background = "white";
        // setTimeout(function () {
        //     window.location = "https://www.google.com/chrome/?brand=CHBD&gclid=EAIaIQobChMIvoTwkuOa5QIVUuDICh18YAAbEAAYASABEgKbofD_BwE&gclsrc=aw.ds";
        // }, 2000);
    }
}

var clearStorage = document.getElementById("clear-storage");
clearStorage.addEventListener("click", function(){
    removeAllLocalStorageDOM();
    clearAllLocalStorage();
})

function init(cookies) {
    browserDetect();
    var banner = document.getElementById("outer-banner");
    banner.style.opacity = 0;
    keepShimmering();

    function keepShimmering() {
        if (banner.style.opacity == 0) {
            shimmer();
        } else {//fadeOut();
        }
        banner.style.opacity = 0;

        setTimeout(keepShimmering, 2000);
    }

    function shimmer() {
        banner.style.opacity = parseFloat(banner.style.opacity) + .01;

        if (banner.style.opacity >= 1) {
            banner.style.opacity = -1;
            clearTimeout(shimmer);
        }

        setTimeout(shimmer, 20);
    }

    displayAllFromLocalStorage();
   
    getDataFromAjaxCall('./data/actual_data.json');
} 