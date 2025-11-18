console.log("Script načítaný správne!");

const btn = document.getElementById("btn-bg");

const text = document.getElementById("text");

if (btn && text) {
    btn.addEventListener("click", () => {
        text.textContent = "commit and push";
    });
}

