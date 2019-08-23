<?php
session_start();
if (isset($_REQUEST["username"]) && isset($_REQUEST["password"])) {
   
    $username =  $_REQUEST["username"];
    $password = $_REQUEST["password"];
    // per ora tolgo il controllo password, vediamo se funziona la sessione
    if (is_password_correct($username, $password)) {
        if (isset($_SESSION)) {
            session_regenerate_id(true);
        }
        $_SESSION["username"] = $username; # start session, remember user info
        $message = "Login effettuato!";
        #echo ("<script type='text/javascript'>alert('$message');</script>");
        echo ("logged");
        #  redirect("../index.html", "Login successful! Welcome back.");
    } else {
        $message = "Wrong username and or password!";
        #echo ("<script type='text/javascript'>alert('$message');</script>");
        #redirect("../login.html", "Wrong username and or password!");
        echo ("not");

    }
}

function db_connect()
{
    $mysqli = new mysqli("localhost", "root", "", "shoeshop");
    return $mysqli;
}

# Returns TRUE if given password is correct password for this user name.
function is_password_correct($name, $password)
{

    $db = db_connect();

    $rows = $db->query("SELECT password FROM user WHERE username='$name'");
    $followingdata = $rows->fetch_assoc(); #trasnform in associative array from mysqli type
    //print_r($followingdata); //The print_r() function is a built-in function in PHP and is used to print or display information stored in a variable.
    if ($followingdata) {
        {
            $correct_password = $followingdata["password"];
            return $password === $correct_password;
        }
    } else {
        return false; # user not found
    }
}

function redirect($url, $flash_message)
{
    if ($flash_message) {
        $_SESSION["flash"] = $flash_message;
    }
    session_write_close();
    header("Location: $url");
    die;
}
