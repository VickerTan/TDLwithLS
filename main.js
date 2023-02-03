window.addEventListener("load", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const nameInput = document.querySelector("#name");
    const newTaskForm = document.querySelector("#new-task-form");

    const username = localStorage.getItem("username") || "";

    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username", e.target.value);
    })

    newTaskForm.addEventListener("submit", e => {
        e.preventDefault();

        const task = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        e.target.reset();

        DisplayTasks();
    })

    DisplayTasks();
}) 

function DisplayTasks () {
    const taskList = document.querySelector("#task-list");

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const label = document.createElement("label");
        const input_check = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const input_content = document.createElement("input");
        const actions = document.createElement("div");
        const edit_b = document.createElement("button");
        const delete_b = document.createElement("button");

        input_check.type = "checkbox";
        input_check.checked = task.done;
        span.classList.add("bubble");

        if (task.category == "personal") {
            span.classList.add("personal");
        } else {
            span.classList.add("business");
        }

        content.classList.add("task-content");

        input_content.type = "text";
        input_content.value = task.content;
        input_content.setAttribute("readonly", true);
        if (task.category == "personal") {
            input_content.classList.add("personal");
        } else {
            input_content.classList.add("business");
        }

        actions.classList.add("actions");
        edit_b.classList.add("edit");
        delete_b.classList.add("delete");

        edit_b.innerHTML = "Edit";
        delete_b.innerHTML = "Delete";

        label.appendChild(input_check);
        label.appendChild(span);
        content.appendChild(input_content);
        actions.appendChild(edit_b);
        actions.appendChild(delete_b);

        taskItem.appendChild(label);
        taskItem.appendChild(content);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);

        if (task.done) {
            taskItem.classList.add("done");
        }

        input_check.addEventListener("click", e => {
            task.done = e.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            if (task.done) {
                taskItem.classList.add("done");
            } else {
                taskItem.classList.remove("done");
            }
        })

        edit_b.addEventListener("click", e => {
            const input = content.querySelector("input");

            if (edit_b.innerHTML == "Edit") {
                edit_b.innerHTML = "Save";
                input.removeAttribute("readonly");
                input.focus();
            } else {
                edit_b.innerHTML = "Edit";
                input.setAttribute("readonly", true);
            }
        })

        delete_b.addEventListener("click", e => {
            tasks = tasks.filter(t => t != task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            DisplayTasks();
        })
    });
}