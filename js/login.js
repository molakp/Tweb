//Verify if user is already logged in or not by performing AJAX reguqest on checklogin.php 
alert("Cookie for Session ID is:");
var cook= getCookie("PHPSESSID");
alert("Cookie for Session ID is: " + cook);

$.ajax({
    type: 'GET',

    url: 'php/checklogin.php',
    dataType: "text",
    data: {
        cookie: cook,
    },
    success: function (data) {
        alert("Code is: " + data);
        if(data== "logged"){
            $(".login-register").empty(); // JQuery per svuotare il nodo selezionato
            var code='<img src=images/already-logged-in.png alt="Already logged in!" class="img-already-logged"> <p class="already-logged-in">Already logged in ;)</p>';
         $(".login-register").append(code);

        }
        else{
            alert("You must log in");
        }
        
        /*da implementare: 
        se checklogin torna si allora bisogna cancellare tutti i form e mettere un messaggio al 
        centro con una spunta verde che dice "already logged in"

        altrimenti non fare nulla e lasciare che l'utente faccia il login con form
        chiamanto poi login.php
        
        
        
        
        
        */

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