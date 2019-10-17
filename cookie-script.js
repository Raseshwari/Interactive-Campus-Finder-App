
var h4ele = document.getElementById("user-details");
var userName = cookies.getCookie("userName");


function setNameCookie(){
    var cookieName = document.getElementById("first-name").value;
    cookies.setCookie("userName", cookieName);
}


if(userName){
    let textNode = document.createTextNode("Welcome "+userName);
    h4ele.appendChild(textNode);
}