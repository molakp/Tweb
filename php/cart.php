<?php
session_start();

//echo(json_encode($_SESSION["items"]));

$mysqli = new mysqli("localhost", "root", "", "shoeshop");




//print_r($followingdata); //The print_r() function is a built-in function in PHP and is used to print or display information stored in a variable.
$element_performed=0;
echo("[");
foreach($_SESSION["items"] as $row){
    $shoeID= $row["id"];
    $shoeID= $mysqli->real_escape_string($shoeID); //sanitize for database input
    $query_result = $mysqli->query("SELECT * FROM shoe WHERE shoeID='".$shoeID."'"); #get query result 
    $result= $query_result->fetch_assoc();  #trasnform in associative array from mysqli type
    $s = new Shoe($result["shoeID"],$result["model"], $result["price"], $result["description"],$result["image"]);
    echo ($s->toJson());
    $element_performed++;
    if($element_performed<= sizeof($_SESSION["items"]) -1 ){
        echo(",");
    }

}
echo("]");








class Shoe
{
    public $id;
    public $model;
    public $price;
    public $description;
    public $image;
    public function __construct($id,$model, $price, $description,$image)
    {
        $this->id=$id;
        $this->model = $model;
        $this->price = $price;
        $this->description = $description;
        $this->image=$image;
    }
    public function toJson()
    {
        return json_encode($this);
    }

}

?>