<?php

/**
 * First check if username already taken, then allow registration. If username taken, prompt the js
 */
if (!isset($_SESSION)) {session_start();}

if (isset($_REQUEST["usernameRegister"]) && isset($_REQUEST["passwordRegister"])) {
    
    $username = $_REQUEST["usernameRegister"];
    $password = $_REQUEST["passwordRegister"];

    $mysqli = new mysqli("localhost", "root", "", "shoeshop");
    $username = $mysqli->real_escape_string($username);
    $password = $mysqli->real_escape_string($password);
    $query="SELECT * FROM `user` WHERE user.username='$username'";

    $result=$mysqli->query($query);
    $result=$result->fetch_assoc();
    if($result== NULL){ #if username is avaiable
     #must determine id of new user 
     $query= "SELECT user.UserID FROM user ORDER BY user.UserID DESC LIMIT 1"; #query to check biggest id
     $result=$mysqli->query($query);
     $result=$result->fetch_assoc();
     $userID=$result["UserID"]+1; #correct user id to insert
     $password=hash('sha256',$password);   
     $query="INSERT INTO `user` (`UserID`, `username`, `password`, `hash`) VALUES ('$userID', '$username', '$password', '');";
     $result=$mysqli->query($query);
    
     if($result){
         echo("ok");
     }
     else{
         echo ("error");

     }
    }else{
        echo("username taken");
    }
  
}else{
    echo("error");
}




?>