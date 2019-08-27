<?php
session_start();

//devo aggiungere un elemento a un array in  $-Session in cui salvare id del carrello
 #echo("Primo vardump ");
#var_dump($_SESSION['items']);
if (isset($_GET["id"])) {
    $id = $_GET["id"];
    if (!isset($_SESSION['items'])) {
        $_SESSION['items'] = array();
    }
  /*  $index_to_remove = 0;
    $count = 0;
    foreach ($_SESSION['items'] as $item) {
        if ($item["id"] == $id) {
            $index_to_remove = $count;

        }

        $count++;

    }

    \array_splice($_SESSION['items'], $index_to_remove);
    // per accedere fare  $_SESSION['items'][12345]['id']; */
    unset($_SESSION['items'][$id]);
   # var_dump($_SESSION['items']);
    echo ("ok");

} else {
    echo ("error");
}
