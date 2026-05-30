let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const mainContent = document.querySelector("#main-content");
const footer = document.querySelector("#footer");
const countDisplay = document.querySelector("#todoCount");
const filters = document.querySelector("#filters");
const clearBtn = document.querySelector("#clearCompleted");

function render() {
    todoList.innerHTML = "";

    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);

    
    const fragment = document.createDocumentFragment();
    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id; 

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "toggle";
        checkbox.checked = todo.completed;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text; 

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "❌";

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.value = todo.text;

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(editInput);

        fragment.appendChild(li);
    });

    todoList.appendChild(fragment); 
    const activeCount = todos.filter(t => !t.completed).length;
    countDisplay.innerHTML = `<strong>${activeCount}</strong> item${activeCount !== 1 ? "s" : ""} left`;
    const isEmpty = todos.length === 0;
    mainContent.classList.toggle("hidden", isEmpty);
    footer.classList.toggle("hidden", isEmpty);
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const text = input.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text: text, completed: false });
        input.value = "";
        saveTodos();
        render();
    }
});

todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        render();
    } 
    else if (e.target.classList.contains("toggle")) {
        const id = Number(e.target.closest("li").dataset.id);
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
});


todoList.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("todo-text")) {
        const li = e.target.closest("li");
        li.classList.add("editing");
        const editInput = li.querySelector(".edit-input");
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    }
});

todoList.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("edit-input")) {
        if (e.key === "Enter") {
            saveEdit(e.target);
        } else if (e.key === "Escape") {
            render(); 
        }
    }
});

todoList.addEventListener("focusout", (e) => {
    if (e.target.classList.contains("edit-input")) {
        saveEdit(e.target);
    }
});
function saveEdit(inputElement) {
    const li = inputElement.closest("li");
    if (!li.classList.contains("editing")) return; 
    
    const id = Number(li.dataset.id);
    const text = inputElement.value.trim();
    
    if (text) {
        const todo = todos.find(t => t.id === id);
        todo.text = text;
    } else {
        todos = todos.filter(t => t.id !== id);
    }
    
    saveTodos();
    render();
}

filters.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        document.querySelectorAll("#filters a").forEach(a => a.classList.remove("selected"));
        e.target.classList.add("selected");
        currentFilter = e.target.dataset.filter;
        render();
    }
});

clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed); 
    saveTodos();
    render();
});

render();