<?php 
if (!isset($_SESSION)) {session_start();}
if (isset($_SESSION["id"]) && isset($_GET["id"])  ) {

    $mysqli = new mysqli("localhost", "root", "", "shoeshop");

    $id=$_SESSION["id"];
    $id= $mysqli->real_escape_string($id);
    $shoeID=$_GET["id"];
    $shoeID=$mysqli->real_escape_string($shoeID);
    #if item is not present in wishlist nothing appens, exit code is ok
    $query="DELETE FROM `wishlist` WHERE `wishlist`.`UserID` = $id AND `wishlist`.`shoeID` = $shoeID";
    $result = $mysqli->query($query);
    if( $mysqli->error == ""){ #if success
        echo ("ok");
    }
    else{
        echo("error");
    }
}
else{
    echo("error");
}



?>