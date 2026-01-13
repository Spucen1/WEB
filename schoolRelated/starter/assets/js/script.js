// ===================================
// ÚLOHA 1: Základné údaje
// ===================================
// Vytvor 4 premenné podľa toho, kde v akom elemente sa majú vypísať
// Daj si do premenných aj elementy, s ktorými budeš pracovaťm vytiahni si ich podľa ID
//
let meno = "Samuel";
let vek = 18;
let skola = "Piaristická SOŠ PD";
let konicek = "Videohry";

let menoElement = document.getElementById("meno");
let vekElement = document.getElementById("vek");
let skolaElement = document.getElementById("skola");
let konicekElement = document.getElementById("konicek");
let rokNarodeniaElement = document.getElementById("rok-narodenia");

// ===================================
// ÚLOHA 2: Zobrazenie údajov
// ===================================
// Použi textContent na zobrazenie všetkých 4 údajov v jednotlivých elementoch
//
menoElement.textContent = meno;
vekElement.textContent = vek;
skolaElement.textContent = skola;
konicekElement.textContent = konicek;

// ===================================
// ÚLOHA 3: Zmena farieb (6 bodov)
// ===================================
// 1. Najdi id tlačidla tak aby si s ním mohol pracovať, a tiež element, ktorých ich všetky obaľuje, aby si mu mohol zmeniť farbu orámovania
// 2. Pridaj mu event listener nech reaguje na udalosť 'click'
// 3. Pri kliknutí prepni triedu 'zmenene-farby' na elemente s triedou .container
//    Použiješ: classList.toggle("zmenene-farby");
zmenene = false;

let btn = document.getElementById("btn-zmena");
let container = document.querySelector(".container");
btn.addEventListener("click", function () {
    container.classList.toggle("zmenene-farby");
    if (zmenene == false) {
        btn.textContent = "Pôvodné farby";
        zmenene = true;
    } else {
        btn.textContent = "Zmeniť farby";
        zmenene = false;
    }
});

// ===================================
// ÚLOHA 4: Výpočet roku narodenia
// ===================================
// Vypočítaj rok narodenia,u lož do premennej, zobraz do elementu

let rokNarodenia = 2026 - vek;
rokNarodeniaElement.textContent = rokNarodenia;

// ===================================
// BONUS: Zmena textu tlačidla (4 body)
// ===================================
// Voliteľné
// Zmeň text tlačidla z "Zmeniť farby" na "Pôvodné farby" a naspäť
