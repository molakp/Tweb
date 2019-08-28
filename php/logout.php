<?php
session_start();
session_unset(); # flushes out session data
session_destroy();
#destroy all cookies
$past = time() - 3600;
foreach ( $_COOKIE as $key => $value )
{
    setcookie( $key, $value, $past, '/' );
}

echo ("logout");

?>