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
            $email = trim($_POST["email"] ?? "");
            echo "Welcome, $name!";
            echo "<br> $email";
            error_log("NAME: $name");
            error_log("EMAIL: $email");
        } else {
            ?>
            <form action="" method="post">
                <input type="text" name="name" placeholder="name"><br>
                <input type="text" name="email" placeholder="email"><br>
                <input type="submit"><br>
            </form>
            <?php
        }
    ?>
</body>
</html>