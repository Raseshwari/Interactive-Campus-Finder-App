function displayAllFromLocalStorage(){
    // display localstorage if any
    var objFromStorage = JSON.parse(getFromLocalStorage("viewHistory"));

    if (objFromStorage) {
        var objKeys = Object.keys(objFromStorage);
        for (var i = 1; i <= objKeys.length; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "anim-div");
            var anchorEle = document.createElement("a");
            anchorEle.setAttribute("href", viewHistory[i].link);
            anchorEle.setAttribute("target", "_blank");
            anchorEle.textContent = viewHistory[i].name
            anchorEle.setAttribute("class", "result-anchor");
        
            div.appendChild(anchorEle);
            historyDiv.appendChild(div);
        }
    } 
}

function removeAllLocalStorageDOM(){
    var objFromStorage = JSON.parse(getFromLocalStorage("viewHistory"));
    if(objFromStorage){
        var objKeys = Object.keys(objFromStorage);
        for (var i = 1; i <= objKeys.length; i++) {
            historyDiv.removeChild(historyDiv.lastChild);
        }
    }
}

function setInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

function clearLocalStorage(key) {
    localStorage.removeItem(key);
}

function clearAllLocalStorage(){
    localStorage.clear();
}