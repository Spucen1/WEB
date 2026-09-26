<h1>Thank you, <?= $_POST["name"]?>!</h1>

<?php
file_put_contents('data.txt',$_POST["name"] . ": " . $_POST["message"] . "\n", FILE_APPEND);
?>