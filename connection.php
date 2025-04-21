<?php
    $database = new mysqli("localhost", "root", "", "vitameet", 3307);
    if ($database->connect_error) {
        die("Connection failed: " . $database->connect_error);
    }
?>
