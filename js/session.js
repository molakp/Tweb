//var cook = document.cookie.match(/PHPSESSID=[^;]+/);
var cook= getCookie("PHPSESSID");
//alert("Cookie for Session ID in session.js is: " + cook);

$.ajax({
    type: 'GET',

    url: 'php/session.php',
    dataType: "text",
    data: {
        cookie: cook,
        
    },
    success: function (data) {

        if(data == "logged"){}
           // alert("Logged in session.js");
        else{
            // if not logged in must redirect to new page and delete the cookie otherwise on login.html I'll  be logged
           
            window.location.replace("login.html");

        }

    },
    


});




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}