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
    }
    else {
        document.getElementById('button').style.transform = "rotate(90deg)"
        document.getElementById("aside1").style.top = "0"
        document.querySelectorAll("li").forEach(li => {
            li.style.opacity = "1"
            li.style.top = "0";
            li.style.transition = ""
          });
        document.getElementById("item2").classList.add("item2");
        document.getElementById("item3").classList.add("item3");
        document.getElementById("item4").classList.add("item4");
    }
}