<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="thx.php" method="post">
        <input type="text" name="name"><br>
        <input type="text" name="message"><br>
        <input type="submit">
    </form>

    <?php
    $lines = file("data.txt", FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
        echo $line . "<br>";
    }
    ?>
</body>
</html>