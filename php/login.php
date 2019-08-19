<?php 


if (isset($_REQUEST["username"]) && isset($_REQUEST["password"])) {
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    // per ora tolgo il controllo password, vediamo se funziona la sessione
    //if (is_password_correct($username, $password)) {  
      if (isset($_SESSION)) {
        session_regenerate_id(TRUE);
      }
      $_SESSION["username"] = $username;     # start session, remember user info
      $message = "Login effettuato!";
  echo ("<script type='text/javascript'>alert('$message');</script>");
      redirect("../index.html", "Login successful! Welcome back.");
   // } else {
      //redirect("user.php", "Incorrect user name and/or password.");
  //  }
  }
  
  
  
  
  
  function redirect($url, $flash_message = null)
  {
      if ($flash_message) {
          $_SESSION["flash"] = $flash_message;
      }
      # session_write_close();
      header("Location: $url");
      die;
  }




?>