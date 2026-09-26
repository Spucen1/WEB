<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>form</title>
</head>
<body>
    <?php
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $name = trim($_POST["name"] ?? "");
            echo "Welcome, $name!";
            error_log($name);
        } else {
            ?>
            <form action="" method="post">
                <input type="text" name="name"><br>
                <input type="text" name="email"><br>
                <input type="submit"><br>
            </form>
            <?php
        }
    ?>
</body>
</html>