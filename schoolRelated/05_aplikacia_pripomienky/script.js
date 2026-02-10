const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addButton");

function addTask() {
    let li = document.createElement("li");
    li.classList.add("task-item");

    let input = document.createElement("input");
    input.classList.add("task-checkbox");
    input.type = "checkbox";
    li.appendChild(input);

    let span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = taskInput.value;
    taskInput.value = "";
    li.appendChild(span);

    let button = document.createElement("button");
    button.classList.add("delete-button");
    button.textContent = "Zmazať";
    li.appendChild(button);

    taskList.appendChild(li);
}

addBtn.addEventListener("click", addTask());
document.body.addEventListener("keydown", function (event) {
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
    if (event.target.className === "task-checkbox") {
        let target = event.target;
        let parent = target.parentElement;
        if (target.checked) {
            parent.classList.add("completed");
        } else {
            parent.classList.remove("completed");
        }
    } else if (event.target.className === "delete-button") {
        event.target.parentElement.remove();
    }
});
