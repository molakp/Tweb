<?php

#return elements in wishlist in json format
if (!isset($_SESSION)) {session_start();}
if (isset($_SESSION["id"]  )) {
    $mysqli = new mysqli("localhost", "root", "", "shoeshop");

   /* $username = $_SESSION["username"];
    $username = $mysqli->real_escape_string($username); #sanitize for db input
    $query = "SELECT * FROM `user` WHERE user.username='$username'";
    $result = $mysqli->query($query);
    $row = $result->fetch_assoc(); 
    $id = $row["UserID"]; */
    $id=$_SESSION["id"];
    $id= $mysqli->real_escape_string($id);
    $query = "SELECT DISTINCT shoe.shoeID,shoe.brand,shoe.size,shoe.model,shoe.image,shoe.gender,shoe.type,shoe.description,shoe.price FROM shoe JOIN wishlist ON wishlist.shoeID WHERE shoe.shoeID=wishlist.shoeID AND wishlist.UserID='$id'";
    $result = $mysqli->query($query);
    echo ("[");
    $rows_number = mysqli_num_rows($result);
    $element_performed = 0;
    foreach ($result as $row) {
        $s = new Shoe($row["shoeID"], $row["model"], $row["price"], $row["description"], $row["image"]);
        echo ($s->toJson());
        $element_performed++;
        if ($element_performed <= $rows_number - 1) {
            echo (",");
        }

    }
    echo ("]");
}
else{
    echo("error");
}

class Shoe
{
    public $id;
    public $model;
    public $price;
    public $description;
    public $image;
    public function __construct($id, $model, $price, $description, $image)
    {
        $this->id = $id;
        $this->model = $model;
        $this->price = $price;
        $this->description = $description;
        $this->image = $image;
    }
    public function toJson()
    {
        return json_encode($this);
    }

}
