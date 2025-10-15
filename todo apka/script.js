const STORAGE_KEY = "todo_tasks";

const style = document.createElement('style');
style.textContent = `
body {
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 40px;
    gap: px;
}
.done {
    text-decoration: line-through;
    color: #888;
}
div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: lightgray;
    width: 300px;
    gap: 10px;
}
input {
    border-radius: 5px;
}
ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0;
    margin: 0;
}
li {
    gap: 5px;
    display: flex;
    align-items: center;
    list-style: none;
}
`;
document.head.appendChild(style);

const div = document.createElement("div");
document.body.appendChild(div);

const h1 = document.createElement("h1");
h1.textContent = "To Do List";
div.appendChild(h1);

const input = document.createElement("input");
div.appendChild(input);

const AddBTn = document.createElement("button");
AddBTn.textContent = "Add";
div.appendChild(AddBTn);

const ul = document.createElement("ul");
div.appendChild(ul);


function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}


function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


function renderTasks() {
    ul.innerHTML = "";
    const tasks = loadTasks();
    tasks.forEach((task, idx) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        li.appendChild(checkbox);

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        if (task.done) textSpan.classList.add("done");
        li.appendChild(textSpan);

        checkbox.addEventListener("change", function () {
            tasks[idx].done = checkbox.checked;
            saveTasks(tasks);
            renderTasks();
        });

        const RemoveBTn = document.createElement("button");
        RemoveBTn.textContent = "X";
        RemoveBTn.addEventListener("click", function () {
            tasks.splice(idx, 1);
            saveTasks(tasks);
            renderTasks();
        });

        const EditBTn = document.createElement("button");
        EditBTn.textContent = "Edit";
        EditBTn.addEventListener("click", function () {
            const EditInput = document.createElement('input');
            EditInput.value = textSpan.textContent;
            li.replaceChild(EditInput, textSpan);

            EditInput.focus();

            function finishEdit() {
                if (EditInput.value.trim() !== "") {
                    tasks[idx].text = EditInput.value;
                    saveTasks(tasks);
                    renderTasks();
                } else {
                    li.replaceChild(textSpan, EditInput);
                }
            }

            EditInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") finishEdit();
                if (e.key === "Escape") li.replaceChild(textSpan, EditInput);
            });
            EditInput.addEventListener("blur", finishEdit);
        });

        li.appendChild(RemoveBTn);
        li.appendChild(EditBTn);

        ul.appendChild(li);
    });
}


function addTask() {
    const v = input.value;
    if (v === "") return;
    const tasks = loadTasks();
    tasks.push({ text: v, done: false });
    saveTasks(tasks);
    renderTasks();
    input.value = "";
}

AddBTn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});


renderTasks();  