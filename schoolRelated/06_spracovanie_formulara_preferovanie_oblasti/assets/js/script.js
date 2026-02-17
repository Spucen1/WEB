const menoInput = document.getElementById("meno");
const emailInput = document.getElementById("email");
const ineInput = document.getElementById("ineOblasti");
const oblastiGroup = document.querySelector(".checkbox-group");
const oblastiInput = oblastiGroup.querySelectorAll("input");
const submitBtn = document.querySelector(".btn-submit");

let oblasti;

/*function getOblasti() {
    let oblastiList = {};
    oblastiInput.forEach((element) => {
        console.log(element.value);
        if (element.checked) {
            oblastiList[element.value] = true;
        } else if (!element.checked) {
            oblastiList[element.value] = false;
        }
    });
    return oblastiList;
}*/

function getOblasti() {
    let oblastiList = [];
    oblastiInput.forEach((element) => {
        if (element.checked) {
            oblastiList.push(element.value);
        }
    });
    return oblastiList;
}

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    oblasti = getOblasti();
    console.log(`meno: ${menoInput.value}`);
    console.log(`email: ${emailInput.value}`);
    console.log(`oblasti: ${ineInput.value}`);
    console.log(oblasti);
});
