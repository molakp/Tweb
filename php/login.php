<?php

/**
 * Idea per i cookie persistenti di login:
 * 1) Prendere hash di username utente + data attuale+ int random ( come salt)
 * 2)creare cookie di login persistente  con tale hash
 * 3) salvare in database lo stesso hash ( colonna in tabella user)
 * 4) al login, js manda cookie e php controlla se hash in cookie == hash in database, se non valido si esegue login normalmente
 * 5) se valido redirect da js in a index e utente loggato
 *
 *
 *
 *
 *       $food = array('fruits' => array('orange', 'banana', 'apple'),
 *            'veggie' => array('carrot', 'collard', 'pea'));

 *        recursive count
 *           echo count($food, COUNT_RECURSIVE); // output 8

 *       // normal count
 *       echo count($food);  output 2


 */
session_start();

function verify_login_cookie()
{
    if (isset($_GET["login"])) {

        $mysqli = db_connect();
        $user_hash = $mysqli->real_escape_string($_GET["login"]); // sanitize string before db query
        $rows = $mysqli->query("SELECT * FROM `user` where hash ='$user_hash'");

        $followingdata = $rows->fetch_assoc(); #trasnform one row in associative array from mysqli type

        if ($rows->num_rows == 1) { // se ottengo max 1 risultato, uso num_rows che è metodo di oggetti tipo mysqli_result
            if ($_GET["login"] == $followingdata["hash"]) { // se l'hash è uguale a quello in database
                // user è loggato correttamente

                $mysqli = db_connect();
                $_SESSION["username"] = $followingdata["username"]; # start session, remember user info
                $username = $mysqli->real_escape_string($followingdata["username"]);
                $login_hash = hash('sha256', $username . time() . random_int(0, 100000000)); //hash in sha256 username + data unix+ cripto-safe random int  come salt
                $login_hash = $mysqli->real_escape_string($login_hash);
                setcookie("login", $login_hash, time() + 3600 * 24, "/"); // set cookie for login

                //salvo l'hash del login che mi serve per controllare il cookie fornito dall'utente

                $rows = $mysqli->query(" UPDATE `user` SET `hash` = '$login_hash' WHERE `user`.`username` = '$username';");

                $query = "SELECT * FROM `user` WHERE user.username='$username'";
                $result = $mysqli->query($query);
                $row = $result->fetch_assoc();
                $id = $row["UserID"];
                $_SESSION["id"] = $id;
                // var_dump($id);
                echo ("logged");

            }

        }

    }

}

verify_login_cookie();

/*if(isset($_GET["login"])){ // prima controllo che abbia il cookie di login
$mysqli=db_connect();
$login= $mysqli->real_escape_string( $_GET["login"]);
$rows = $mysqli->query(" UPDATE `user` SET `hash` = ' $login_hash' WHERE `user`.`username` = '$username';");

}*/

if (isset($_REQUEST["username"]) && isset($_REQUEST["password"])) {

    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];

    if (is_password_correct($username, $password)) {
        if (isset($_SESSION)) {
            session_regenerate_id(true);
        }
        $mysqli = db_connect();
        $_SESSION["username"] = $username; # start session, remember user info
        # $message = "Login effettuato!";
        $login_hash = hash('sha256', $username . time() . random_int(0, 100000000)); //hash in sha256 username + data unix+ cripto-safe random int  come salt
        $login_hash = $mysqli->real_escape_string($login_hash);
        setcookie("login", $login_hash, time() + 3600, "/"); // set cookie for login

        //salvo l'hash del login che mi serve per controllare il cookie fornito dall'utente
        $username = $mysqli->real_escape_string($username);
        $rows = $mysqli->query(" UPDATE `user` SET `hash` = '$login_hash' WHERE `user`.`username` = '$username';");
        $query = "SELECT * FROM `user` WHERE user.username='$username'";
        $result = $mysqli->query($query);
        $row = $result->fetch_assoc();
        $id = $row["UserID"];
        $_SESSION["id"] = $id;
        echo ("logged");

    } else {
        $message = "Wrong username and or password!";
        #echo ("<script type='text/javascript'>alert('$message');</script>");
        #redirect("../login.html", "Wrong username and or password!");
        echo ("not");

    }
}

function db_connect()
{
    $mysqli = new mysqli("localhost", "root", "", "shoeshop");
    return $mysqli;
}
function login()
{
    if (isset($_SESSION)) {
        session_regenerate_id(true);
    }
    $mysqli = db_connect();
    $_SESSION["username"] = $username; # start session, remember user info
    # $message = "Login effettuato!";
    $login_hash = hash('sha256', $username . time() . random_int(0, 100000000)); //hash in sha256 username + data unix+ cripto-safe random int  come salt
    $login_hash = $mysqli->real_escape_string($login_hash);
    setcookie("login", $login_hash, time() + 3600, "/"); // set cookie for login

    //salvo l'hash del login che mi serve per controllare il cookie fornito dall'utente
    $username = $mysqli->real_escape_string($username);
    $rows = $mysqli->query(" UPDATE `user` SET `hash` = '$login_hash' WHERE `user`.`username` = '$username';");
    echo ("logged");

}
# Returns TRUE if given password is correct password for this user name.
function is_password_correct($name, $password)
{
  
    $db = db_connect();
    $name=$db->real_escape_string($name);
    
    $rows = $db->query("SELECT password FROM user WHERE username='$name'");
    $followingdata = $rows->fetch_assoc(); #trasnform in associative array from mysqli type
    //print_r($followingdata); //The print_r() function is a built-in function in PHP and is used to print or display information stored in a variable.
    if ($followingdata) {
        {
            $correct_password = $followingdata["password"];
            return $password === $correct_password;
        }
    } else {
        return false; # user not found
    }
}

function redirect($url, $flash_message)
{
    if ($flash_message) {
        $_SESSION["flash"] = $flash_message;
    }
    session_write_close();
    header("Location: $url");
    die;
}
