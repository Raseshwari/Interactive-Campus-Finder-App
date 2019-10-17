
document.getElementById("first-name").addEventListener("blur", function(e) {
    console.log(e);
    cookies.setCookie("userName", e.target.value);
});

let h4ele = document.getElementById("user-details");
let userName = cookies.getCookie("userName");

if(userName){
    let textNode = document.createTextNode("Welcome "+userName);
    h4ele.appendChild(textNode);
}