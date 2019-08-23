<?php
session_start();

//devo aggiungere un elemento a un array in  $-Session in cui salvare id del carrello

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    if (!isset($_SESSION['items'])) {
        $_SESSION['items'] = array();
    }
    $_SESSION['items'][$id] = array('id' => $id); // salvo l'id in un array di nome id nell'array globale $_SESSION
    // per accedere fare  $_SESSION['items'][12345]['id'];
    echo ("ok");

} else {
    echo ("error");
}
