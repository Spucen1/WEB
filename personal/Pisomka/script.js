/*
let nazov = "Notebook";
let cena = 500;
let zlava = 15;
let vyskaZlavy = (cena * zlava) / 100;
let hodnotenie;

if (vyskaZlavy >= 100) {
    hodnotenie = "idk";
} else if (99 >= vyskaZlavy && vyskaZlavy >= 50) {
    hodnotenie = "idk2";
} else if (49 >= vyskaZlavy && vyskaZlavy >= 0) {
    hodnotenie = "idk3";
}

console.log(`Produkt: ${nazov}`);
console.log(`Cena: ${cena}€`);
console.log(`Zľava: ${zlava}%`);
console.log(`Výška Zľavy: ${vyskaZlavy}€`);
console.log(`Konečná cena: ${cena - vyskaZlavy}€`);
console.log(`Hodnotenie: ${hodnotenie}`);
*/

let istinaInput = document.getElementById("istina");
let urokInput = document.getElementById("urok");
let rokyInput = document.getElementById("roky");
let submit = document.getElementById("submit");

submit.addEventListener("click", function () {
    let urok = urokInput.value;
    console.log(urok);
});
