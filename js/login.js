//Verify if user is already logged in or not by performing AJAX reguqest on checklogin.php 
alert("Cookie for Session ID is:");
var cook = getCookie("PHPSESSID");
alert("Cookie for Session ID is: " + cook);

$("#login_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "GET",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            if (data == "logged") {
                alert("logged +cookie first time");
                window.location.href="index.html";
            }
            else
                alert("Error:"+data); // show response from the php script.
        }
    });


});
$("#register_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "GET",
        url: "php/register.php",
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            if (data == "ok") {
                alert("registration succes!");
                window.location.href="login.html";
            }
            else
                alert("Error in registration:"+data); // show response from the php script.
        }
    });


});


var redirect=false;
var cook = getCookie("login");
$.ajax({
    type: 'GET',
    url: 'php/login.php',
    dataType: "text",
    data: {
        login: cook,
    },
    success: function (data) {
        alert("Code is: " + data);
        if (data == "logged") {

            alert("logged +cookie ");
            $(".login-register").empty(); // JQuery per svuotare il nodo selezionato
            var code = '<img src=images/already-logged-in.png alt="Already logged in" class="img-already-logged">' +
            '<p class="already-logged-in">Already logged in  ;)</p>'+
            ' <div id="homepage"><button class ="home-button">Homepage</button></div>'+
            ' <div id="logout-id"><button class ="logout-button">Logout</button></div>';
            $(".login-register").append(code);
            $(".home-button").click(function(e){

                window.location.href ="index.html";

            });
            $(".logout-button").click(function(e){
                $.ajax({
                    type: "GET",
                    url: "php/logout.php",
                    
                    success: function (data) {
                        if (data == "logout") {
                            alert("LOGOUT");
                            window.location.href ="login.html";
                        }
                        else
                            alert("Error:"+data); // show response from the php script.
                    }
                });
               

            });


            

                // Move to a new location or you can do something else
                //window.location.href ="index.html";


           
            // Move to a new location or you can do something else
            
        }
    },
    error: function(){
        alert("error");

    }
});



//parte in automatico e svuota la pagina di login se siamo già loggati, se non lo siamo non fa nulla e la pagina rimane come è
/*$.ajax({
    type: 'GET',
    url: 'php/session.php',
    dataType: "text",
    data: {
        cookie: cook,
    },
    success: function (data) {
        alert("Code is: " + data);
        if (data == "loggedlogged") {
            $(".login-register").empty(); // JQuery per svuotare il nodo selezionato
            var code = '<img src=images/already-logged-in.png alt="Already logged in" class="img-already-logged"> <p class="already-logged-in">Already logged in , redirecting to home in 2 seconds! ;)</p>';
            $(".login-register").append(code);
            window.setTimeout(function () {

                // Move to a new location or you can do something else
               redirect =true;

            }, 2000);

        }
        else {
            alert("You must log in");
        }
    },
});  */

if(redirect){
    window.location.href ="index.html";
}

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