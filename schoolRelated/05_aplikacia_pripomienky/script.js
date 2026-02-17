const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addButton");
const STORAGE_KEY = "todoTasks";

function loadTasks() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    taskList.innerHTML = data.join("");
}

function saveTasks() {
    const items = Array.from(taskList.children).map((li) => li.outerHTML);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
        return;
    }

    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
        <input class="task-checkbox" type="checkbox" />
        <span class="task-text"></span>
        <button class="delete-button">Zmazať</button>
    `;
    li.querySelector(".task-text").textContent = text;
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

/* checkbox.addEventListener("click", function (event) {
    let target = event.target;
    let parent = target.parentElement;
    if (target.value === true) {
        parent.classList.add("completed");
    } else {
        parent.classList.add;
    }
}); */

/*checkbox.forEach((element) => {
    element.addEventListener("click", function (event) {
        let target = event.target;
        let parent = target.parentElement;
        if (target.value) {
            parent.classList.add("completed");
        } else if (!target.value) {
            parent.classList.remove("completed");
        }
    });
});

Array.from(checkbox).forEach(function (element) {
    element.addEventListener("click", function (event) {
        let target = event.target;
        let parent = target.parentElement;
        if (target.value === true) {
            parent.classList.add("completed");
        } else if (target.value) {
            parent.classList.remove("completed");
        }
    });
}); */

/*checkbox.forEach((el) =>
    el.addEventListener("click", (event) => {
        let target = event.target;
        let parent = target.parentElement;
        if (target.value) {
            parent.classList.add("completed");
        } else {
            parent.classList.remove("completed");
        }
    }),
);*/

document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("task-checkbox")) {
        const parent = event.target.closest("li");
        if (parent) {
            parent.classList.toggle("completed", event.target.checked);
            if (event.target.checked) {
                event.target.setAttribute("checked", "");
            } else {
                event.target.removeAttribute("checked");
            }
            saveTasks();
        }
    } else if (event.target.classList.contains("delete-button")) {
        const parent = event.target.closest("li");
        if (parent) {
            parent.remove();
            saveTasks();
        }
    }
});

loadTasks();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js");
    });
}
