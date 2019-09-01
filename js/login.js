//Verify if user is already logged in or not by performing AJAX reguqest on checklogin.php 

var cook = getCookie("PHPSESSID");


$("#login_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    $("#top").empty();
    $.ajax({
        type: "GET",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            if (data == "logged") {
             
                window.location.href = "index.html";
            }
            else {
                var code = "WRONG USERNAME AND OR PASSWORD";
                $("#top").append(code);
              

            }

        }
    });


});
$("#register_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    $("#top").empty();
    $.ajax({
        type: "GET",
        url: "php/register.php",
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            if (data == "ok") {

                var code = "Registration Success!";
                $("#top").append(code);
                window.location.href = "login.html";
            }
            else
                var code = "Error in registration:" + data;
            $("#top").append(code);

        }
    });


});


var redirect = false;
var cook = getCookie("login");
$.ajax({
    type: 'GET',
    url: 'php/login.php',
    dataType: "text",
    data: {
        login: cook,
    },
    success: function (data) {

        if (data == "logged") {


            $(".login-register").empty(); // JQuery per svuotare il nodo selezionato
            var code = '<img src=images/already-logged-in.png alt="Already logged in" class="img-already-logged">' +
                '<p class="already-logged-in">Already logged in  ;)</p>' +
                ' <div id="homepage"><button class ="home-button">Homepage</button></div>' +
                ' <div id="logout-id"><button class ="logout-button">Logout</button></div>';
            $(".login-register").append(code);
            $(".home-button").click(function (e) {

                window.location.href = "index.html";

            });
            $(".logout-button").click(function (e) {
                $.ajax({
                    type: "GET",
                    url: "php/logout.php",

                    success: function (data) {
                        if (data == "logout") {

                            window.location.href = "login.html";
                        }
                        else
                            var code = "Error in registration:" + data;
                        $("#top").append(code);

                    }
                });


            });






        }
    },
    error: function () {
        var code= "Error in ajax request"; 
                $("#top").append(code);

    }
});





if (redirect) {
    window.location.href = "index.html";
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