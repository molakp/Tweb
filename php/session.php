<?php
if (!isset($_SESSION)) {
    session_start();
}

# Redirects current page to login.php if user is not logged in.
function ensure_logged_in()
{
    if (!isset($_SESSION["name"])) {
        redirect("user.php", "You must log in before you can view that page.");
    }
}

# Redirects current page to the given URL and optionally sets flash message.
function redirect($url, $flash_message = NULL) {
    if ($flash_message) {
      $_SESSION["flash"] = $flash_message;
    }
    # session_write_close();
    header("Location: $url");
    die;
  }
