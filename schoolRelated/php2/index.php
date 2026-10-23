<?php
$a = 5;
echo (($a % 2 == 0) ? "ANO" : "NIE") . "<br>";

$a++;

if ($a % 2 == 0) {
    echo "ANO";
} else {
    echo "NIE";
}

echo "<br>";

for ($i = 1; $i <= 100; $i++) {
    echo (($i % 2 == 0) ? "$i " : "");
}

echo "<br>";

$arr = [];

for ($i = 1; $i <= 100; $i++) {
    if ($i % 2 == 0) {
        $arr[] = $i;
    }
}

foreach ($arr as $i) {
    echo "$i ";
}

echo "<br>";

$c = 6;
$f = 1;

echo "<br>Faktoriál čísla $c je ";

for ($c; $c >= 1; $c--) {
    $f = $f * $c;
}

echo "$f.";

?>