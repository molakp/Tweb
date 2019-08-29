<?php

if (!isset($_SESSION)) {session_start();}
if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "GET") {
    header("HTTP/1.1 400 Invalid Request");
    die("ERROR 400: Invalid request - This service accepts only GET requests.");
}

# return the pointer to connected db
function db_connect()
{
    $dsn = new PDO("mysql:dbname=shoeshop;host=localhost", "root", "");
    
    return $dsn;
}

#$db = db_connect();
$query = "SELECT * FROM `shoe` WHERE 1 LIMIT 9";
#$rows = $db->query($query);
$mysqli = new mysqli("localhost", "root", "", "shoeshop");
$result = $mysqli -> query($query);
//header("Content-type: application/json");
echo("[");
$rows_number=mysqli_num_rows ($result);
$element_performed=0;
foreach ($result as $row) {
    $s = new Shoe($row["shoeID"],$row["model"], $row["price"], $row["description"],$row["image"]);
    echo ($s->toJson());
    $element_performed++;
    if($element_performed<= $rows_number-1 ){
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
