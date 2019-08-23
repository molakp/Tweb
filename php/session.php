<?php
session_start();
if (session_id() == $_GET["cookie"] && isset($_SESSION["username"]) ){ // se l'utente ha un cookie di sessione valido e la sessione ha 
    
        
    echo ("logged");
    
} else { // se non lo ha vuol dire che non è loggato opure lo era ma ha perso il cookie
    echo ("Not");
    setcookie("PHPSESSID", "", time() - 3600, '/');
}  




# Redirects current page to login.php if user is not logged in.
function ensure_logged_in()
{
    if (!isset($_SESSION["name"])) {
        redirect("user.php", "You must log in before you can view that page.");
    }
}

# Redirects current page to the given URL and optionally sets flash message.
function redirect($url, $flash_message = null)
{
    if ($flash_message) {
        $_SESSION["flash"] = $flash_message;
    }
    # session_write_close();
    header("Location: $url");
    die;
}
