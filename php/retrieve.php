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

$db = db_connect();
$query = "SELECT * FROM `shoe` WHERE 1 LIMIT 10";
$rows = $db->query($query);
$mysqli = new mysqli("localhost", "root", "", "shoeshop");
$result = $mysqli -> query($query);
//header("Content-type: application/json");
echo("[");
$rows_number=mysqli_num_rows ($result);
$element_performed=0;
foreach ($rows as $row) {
    $s = new Shoe($row["model"], $row["price"], $row["description"]);
    echo ($s->toJson());
    $element_performed++;
    if($element_performed<= $rows_number-1 ){
        echo(",");
    }
       

}
echo("]");


class Shoe
{
    public $model;
    public $price;
    public $description;
    public function __construct($model, $price, $description)
    {
        $this->model = $model;
        $this->price = $price;
        $this->description = $description;
    }
    public function toJson()
    {
        return json_encode($this);
    }

}
