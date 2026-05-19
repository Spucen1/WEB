const pocitadlo = document.getElementById("pocitadlo");
const vysledok = document.getElementById("vysledokText");
const vysledokN = document.getElementById("vysledokNahodne");

let hodnota = 0;
let size = 150;

vysledok.style.fontSize = `${size}%`;

function pozdrav() {
    let vysledok = document.getElementById("vysledok1");

    vysledok.textContent = "👍 Mal som ťa pozdraviť, tak ta zdravím";

    vysledok.style.color = "green";
    vysledok.style.fontWeight = "bold";
}

function zmenFarbuPozadia() {
    const farby = ["#ff6b6b", "#4ecdc4", "#45bd71", "#f7b731", "#a55eea", "#26de81"];

    let vysledok = document.getElementById("vysledok1");

    const nahodnyIndex = Math.floor(Math.random() * farby.length);

    document.body.style.background = farby[nahodnyIndex];

    vysledok.textContent = `Farba pozadia bola zmenena na ${farby[nahodnyIndex]}`;
}

function zvys() {
    hodnota += 1;

    pocitadlo.textContent = hodnota;
}

function zniz() {
    hodnota -= 1;

    pocitadlo.textContent = hodnota;
}

function reset() {
    hodnota = 0;

    pocitadlo.textContent = hodnota;
}

function zvacs() {
    size += 10;

    vysledok.style.fontSize = `${size}%`;
}

function zmens() {
    size -= 10;

    vysledok.style.fontSize = `${size}%`;
}

function normal() {
    size = 150;

    vysledok.style.fontSize = `${size}%`;
}

function random() {
    vysledokN.textContent = Math.floor(Math.random() * 101);
}

function randomCol() {
    let idk = "0123456789ABCDEF";

    let col = "";

    for (let i = 0; i < 6; i++) {
        let dk = Math.floor(Math.random() * idk.length);
        col += idk[dk];
    }
    vysledokN.style.color = `#${col}`;
}

const pozdravBtn = document.getElementById("pozdravBtn");
const zmenFarbuBtn = document.getElementById("zmenFarbuBtn");
const zvysBtn = document.getElementById("zvysBtn");
const znizBtn = document.getElementById("znizBtn");
const resetBtn = document.getElementById("resetBtn");
const zvacsBtn = document.getElementById("zvacsBtn");
const zmensBtn = document.getElementById("zmensBtn");
const normalnyBtn = document.getElementById("normalnyBtn");
const nahodneCisloBtn = document.getElementById("nahodneCisloBtn");
const nahodnaFarbaBtn = document.getElementById("nahodnaFarbaBtn");

pozdravBtn.addEventListener("click", pozdrav);
zmenFarbuBtn.addEventListener("click", zmenFarbuPozadia);
zvysBtn.addEventListener("click", zvys);
znizBtn.addEventListener("click", zniz);
resetBtn.addEventListener("click", reset);
zvacsBtn.addEventListener("click", zvacs);
zmensBtn.addEventListener("click", zmens);
normalnyBtn.addEventListener("click", normal);
nahodneCisloBtn.addEventListener("click", random);
nahodnaFarbaBtn.addEventListener("click", randomCol);
