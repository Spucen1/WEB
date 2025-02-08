# WEB

This repository contains various HTML and CSS projects, ranging from school-related work to personal experiments. It serves as a collection of different web design techniques and coding practices. Occasionally, I experiment with JavaScript, though it is used in only a few projects.

## Code Example

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="CSS/normalize.css">
    <link rel="stylesheet" href="CSS/styles.css">
</head>
<body>
    <script src="script.js"></script>

    <aside class="aside1" id="aside1"></aside>

    <header class="top" id="top">
        <div class="side"><div class="button" id="button" onclick="menu()">☰</div></div>
        <div class="middle"></div>
        <div class="side"><div class="button2" id="button2" onclick="dakrmode()">☀️</div></div>
    </header>

    <aside class="aside2" id="aside2">
        <ul class="menu">
            <li class="item1"><a href="">Service</a></li>
            <li class="item2" id="item2"><a href="">Servicee</a></li>
            <li class="item3" id="item3"><a href="">Serviceee</a></li>
            <li class="item4" id="item4"><a href="">Serviceeee</a></li>
        </ul>
    </aside>

    <main id="rot">
        <div class="mdiv"></div>
        <div class="mdiv"></div>
        <div class="mdiv bottom"></div>
    </main>
</body>
</html>
```

---

```CSS
body {
    background-color: #f0f0f0;
}

.top {
    background-color: white;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
}

.button {
    margin: 20px;
    font-size: 20px;
    cursor: pointer;
    color: #1a1a1a;
    transition: all 0.5s;
    padding: 5px;
    padding-top: 3px;
    flex-grow: 1;
    border-radius: 2px;
    width: 20px;
}

.menu {
    list-style: none;
    text-decoration: none;
}

a {
    text-decoration: none;
    color: #1a1a1a;
}
.aside2 {
    width: 120px;
    margin: 0;
    z-index: 2;
    position: absolute;
}

ul {
    align-items: center;
}

li {
    position: relative;
    top: -20px;
    opacity: 0;
    left: -15px;
    margin-bottom: 5px;
    color: #1a1a1a;
    transition: all 0.25s;
    transition-delay: 0.1s;
}

.aside1 {
    position: absolute;
    background-color: white;
    width: 120px;
    height: 160px;
    z-index: 1;
    top: -110px;
    transition: all 0.5s;
    border-radius: 3px;
}

.item2 {
    transition-delay: 0.2s;
}

.item3 {
    transition-delay: 0.3s;
}

.item4 {
    transition-delay: 0.4s;
}

main {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2px;
    transition: all 1s;
}

.mdiv {
    margin: auto;
    background-color: black;
    height: 2px;
    width: 12px;
    opacity: 0;
}

.button2 {
    cursor: pointer;
    width: 22px;
    background-color: #f0f0f0;
    padding: 5px;
    font-size: large;
    flex-grow: 1;
    border-radius: 14px;
}

.side {
    flex-grow: 1;
}

.middle {
    flex-grow: 30;
}
```

---

## Notes on Learning

This repository includes my learning journey through HTML and CSS, with a focus on web design and layout. Some projects are simple and school-related, while others are more experimental and personal. Although I’ve tried using JavaScript in a few projects, it is not a primary focus in most of the files.