<?php
function N() {
    echo "Niggers<br>";
}

N();

function A($a) {
    echo $a . "<br>";
}

$ahh = "Ahh";

A($ahh);

function B() {
    return "YO<br>";
}

echo B();

function C($w) {
    return $w . "<br>";
}

$wau = "Wau";

echo C($wau);

function max2($a, $b) {
    return ($a > $b) ? $a : $b;
}

$a = 3; $b = 6; $c = 7;

echo max2(max2($a, $b), $c);
?>