function idk() {
    if(document.getElementById("img").style.color === "white") {
        document.getElementById("img").style.color = "black"
        document.getElementById("img").src = "IMG/image copy 2.png"
        document.getElementById("htm").style.backgroundColor = "black"
        document.getElementById("hea").style.backgroundColor = "#121212"
        const divs = document.querySelectorAll("main div");
        divs.forEach(function(div) {
            div.style.backgroundColor = "#121212";
        });
    }
    else {
        document.getElementById("img").style.color = "white"
        document.getElementById("img").src = "IMG/image copy.png"
        document.getElementById("htm").style.backgroundColor = "white"
        document.getElementById("hea").style.backgroundColor = "black"
        const divs = document.querySelectorAll("main div");
        divs.forEach(function(div) {
            div.style.backgroundColor = "#ededed";
        });
    }
}