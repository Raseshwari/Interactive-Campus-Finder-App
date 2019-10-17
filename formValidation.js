var formButton = document.getElementById("get-started-btn");
var firstNameFlag = false;
var lastNameFlag = false;
var emailFlag = false;
document.getElementById("get-started-btn").setAttribute("href","#get-started");

formButton.addEventListener("click", function (e) {
    if(validateFormFields()){
        document.getElementById("get-started-btn").setAttribute("href","#get-started");
        console.log( document.getElementById("get-started-btn"))
    }else{
        e.preventDefault();
    }
})

function appendErrorMsg(node, msg){
    var errDiv = document.createElement("div");
    var errMsg = document.createTextNode(msg);
    errDiv.setAttribute("class", "err-msg");
    errDiv.appendChild(errMsg);
    node.parentNode.appendChild(errDiv);
    window.setTimeout(function() {
        node.value = "";
        node.parentNode.removeChild(node.parentNode.lastChild)
    }, 2000);
}

function validateNameField(name, node){
    if (name == "") {
        appendErrorMsg(node,"Name field cannot be empty")
        return false;
    } else if (name) {
        var regex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g;
        if (!name.match(regex)) {
            appendErrorMsg(node, "Name cannot contain special characters");
            return false;
        }
    }
    return true;
}

function validateEmailField(email, node){
    console.log(email)
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(!email.match(regex));
    if(!email.match(regex)){
        appendErrorMsg(node, "Invalid email address");
        return false;
    }
    return true;
}

function validateFormFields() {
    var firstNameEle = document.getElementById("first-name");
    var lastNameEle = document.getElementById("last-name");
    var emailEle = document.getElementById("email");
    var firstName = firstNameEle.value;
    var lastName = lastNameEle.value;
    var email = emailEle.value;
    firstNameFlag = validateNameField(firstName, firstNameEle);
    lastNameFlag = validateNameField(lastName, lastNameEle);
    emailFlag = validateEmailField(email, emailEle);
    console.log(firstNameFlag, lastNameFlag, emailFlag)
    if(firstNameFlag && lastNameFlag && emailFlag){
       return true;
    }
    return false;
}
