const vystup = document.getElementById("vystup");

async function convert(amount, from, to) {
    const res = await fetch("https://api.cnb.cz/cnbapi/exrates/daily?lang=en");
    const data = await res.json();

    const rates = {};

    for (const item of data.rates) {
        rates[item.currencyCode] = item.rate / item.amount;
    }

    rates["CZK"] = 1;

    return (amount * rates[from]) / rates[to];
}

function convertBtn() {
    const amount = document.getElementById("value1").textContent;
    const cur1 = document.getElementById("cur1").value;
    const cur2 = document.getElementById("cur2").value;

    let value = convert(parseInt(amount), cur1, cur2);
    console.log(value);

    vystup.textContent = value;
}

document.getElementById("convert").addEventListener("click", convertBtn);
