<?php
# The  login form  of login.html submits to here.
# Upon login, remembers login username in a PHP session variable.
session_start();
if (session_id() == $_GET["cookie"] ) { // se l'utente ha un cookie di sessione valido

   
  echo("logged");
    
} else { // se non lo ha vuol dire che non è loggato oopure lo era ma ha perso il cookie
   echo("NOT");
}  


?>
