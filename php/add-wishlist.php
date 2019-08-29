<?php 
if (!isset($_SESSION)) {session_start();}
if (isset($_SESSION["id"]) && isset($_GET["id"])  ) {

    $mysqli = new mysqli("localhost", "root", "", "shoeshop");

    $id=$_SESSION["id"];
    $id= $mysqli->real_escape_string($id);
    $shoeID=$_GET["id"];
    $shoeID=$mysqli->real_escape_string($shoeID);
    $query="INSERT INTO `wishlist` (`UserID`, `shoeID`) VALUES ('$id', '$shoeID');";
    $result = $mysqli->query($query);
    if( $mysqli->error == ""){ #if no duplicate 
        echo ("ok");
    }
    else{
        echo("duplicate");
    }
}
else{
    echo("error");
}



?>