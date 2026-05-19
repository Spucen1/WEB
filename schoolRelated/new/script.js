const temps = [7, 6, 2, 0, -1, -3, -3];
let sum = 0;
let avg = 0;

temps.forEach(function (temp) {
    sum += temp;

    if (temp <= 0) {
        console.log(`Námraza!, teplota je: ${temp}`);
    } else if (temp <= 4) {
        console.log(`Kaša!, teplota je: ${temp}`);
    } else {
        console.log(`Sucho!, teplota je: ${temp}`);
    }
});

avg = (sum / temps.length).toFixed(2);

console.log(`Priemerná teplota: ${avg}`);
