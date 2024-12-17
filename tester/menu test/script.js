function menu() {
    if (document.getElementById('button').style.transform === "rotate(90deg)") {
        document.getElementById('button').style.transform = ""
        document.getElementById("aside1").style.top = ""
        document.querySelectorAll("li").forEach(li => {
            li.style.opacity = ""
            li.style.top = "";
            li.style.transition = "all 0.2s"
          });
        document.getElementById("item2").classList.remove("item2");
        document.getElementById("item3").classList.remove("item3");
        document.getElementById("item4").classList.remove("item4");
        document.getElementById("rot").style.transform = ""
    }
    else {
        document.getElementById('button').style.transform = "rotate(90deg)"
        document.getElementById("aside1").style.top = "0"
        document.querySelectorAll("li").forEach(li => {
            li.style.opacity = "1"
            li.style.top = "-10px";
            li.style.transition = ""
          });
        document.getElementById("item2").classList.add("item2");
        document.getElementById("item3").classList.add("item3");
        document.getElementById("item4").classList.add("item4");
        document.getElementById("rot").style.transform = "rotate(90deg)"
    }
}

function dakrmode() {
    if (document.getElementById("button2").textContent === "☀️") {
        document.getElementById("button2").textContent = "🌙"
        document.getElementById("button2").style.backgroundColor = "#1a1a1a"
        document.querySelector("body").style.backgroundColor = "#1a1a1a"
        document.getElementById("top").style.backgroundColor = "black"
        document.getElementById("aside1").style.backgroundColor = "black"
        document.getElementById("button").style.color = "#f0f0f0"
        document.querySelectorAll("a").forEach(a => {
            a.style.color = "#f0f0f0"
          });
    }
    else {
        document.getElementById("button2").textContent = "☀️"
        document.getElementById("button2").style.backgroundColor = ""
        document.querySelector("body").style.backgroundColor = ""
        document.getElementById("top").style.backgroundColor = ""
        document.getElementById("aside1").style.backgroundColor = ""
        document.getElementById("button").style.color = ""
        document.querySelectorAll("a").forEach(a => {
            a.style.color = ""
          });
    }
}