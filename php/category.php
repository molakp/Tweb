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

//$db = db_connect();
$type="%00";//standard URLEncoded NUL value
$gender="%00";//standard URLEncoded NUL value



//$stmt = $db->prepare("SELECT * FROM shoe WHERE gender = :gender OR type = :type");

/*** bind the paramaters ***/
/*
$stmt->bindParam(':gender', $gender, PDO::PARAM_STR,10);
$stmt->bindParam(':type', $type, PDO::PARAM_STR, 10);
$rows=$stmt->execute();
$rows_number=mysqli_num_rows ($stmt);
$element_performed=0;
foreach ($rows as $row) {
    $s = new Shoe($row["shoeID"],$row["model"], $row["price"], $row["description"],$row["image"],$row["brand"],$row["size"]);
    echo ($s->toJson());
    $element_performed++;
    if($element_performed<= $rows_number-1 ){
        echo(",");
    }
       

}*/



//$rows = $db->query($query);
$mysqli = new mysqli("localhost", "root", "", "shoeshop");
if(isset($_GET["type"])){
    $type=$mysqli->real_escape_string($_GET["type"]); // escape forbidden character to sanitize input 
   
}
if(isset($_GET["gender"])){
    $gender=$mysqli->real_escape_string($_GET["gender"]);// escape forbidden character to sanitize input
  
} 
$query = "SELECT * FROM `shoe` WHERE gender ='".$gender."' OR type= '".$type."'";
$result = $mysqli -> query($query);
//header("Content-type: application/json");
echo("[");
$rows_number=mysqli_num_rows ($result);
$element_performed=0;
foreach ($result as $row) {
    $s = new Shoe($row["shoeID"],$row["model"], $row["price"], $row["description"],$row["image"],$row["brand"],$row["size"]);
    echo ($s->toJson());
    $element_performed++;
    if($element_performed<= $rows_number-1 ){
        echo(",");
    }
       

}
echo("]");
class Shoe
{
    public $size;
    public $brand;
    public $id;
    public $model;
    public $price;
    public $description;
    public $image;
    public function __construct($id,$model, $price, $description,$image,$brand,$size)
    {
        $this->id=$id;
        $this->model = $model;
        $this->price = $price;
        $this->description = $description;
        $this->image=$image;
        $this->brand=$brand;
        $this->size=$size;
    }
    public function toJson()
    {
        return json_encode($this);
    }

}
