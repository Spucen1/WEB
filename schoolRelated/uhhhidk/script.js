let chlieb = 1.5;
let mlieko = 0.9;
let maslo = 2.3;

let cenaChlieb = chlieb * 2;
let cenaMlieko = mlieko * 3;
let cenaMaslo = maslo;
let cena = cenaChlieb + cenaMlieko + cenaMaslo;

console.log(`chlieb: ${cenaChlieb}`);
console.log(`mlieko: ${cenaMlieko}`);
console.log(`maslo: ${cenaMaslo}`);
console.log(`cena: ${cena}`);

let gramov = 2500;
let kgramov = gramov / 1000;

console.log(kgramov);

let meno = "Peter";
let priezvisko = "Novák";
let celeMeno = meno + " " + priezvisko;
let pocet = celeMeno.length;
let velke = meno.toUpperCase();
let male = priezvisko.toLowerCase();
let idk = velke + " " + male;
let idkk = meno[0];
let idkkk = priezvisko[0];

console.log(celeMeno);
console.log(pocet);
console.log(idk);
console.log(idkk);
console.log(idkkk);

let divs = document.getElementById("idk");

divs.textContent = "";

let mail = meno.toLowerCase() + priezvisko.toLowerCase() + "@mail.com";

console.log(mail);

let veta1 = "javascript je super";
let veta2 = "programovanie nás baví";

if (veta1.length < veta2.length) {
    console.log("veta2 je dlhšia");
} else if (veta1.length == veta2.length) {
    console.log("rovnake");
} else {
    console.log("veta1 je dlhšia");
}
