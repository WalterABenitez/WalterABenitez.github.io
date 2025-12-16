// 1️⃣ DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearPendingBtn = document.getElementById("clearPending");

// 2️⃣ Estado (datos)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3️⃣ Guardar en localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4️⃣ Iconos
function getIcon(taskText) {
  const text = taskText.toLowerCase();

  if (text.includes("comer") || text.includes("cocinar")) return '<i class="fa-solid fa-utensils"></i>';
  if (text.includes("dormir")) return '<i class="fa-solid fa-bed"></i>';
  if (text.includes("estudiar")) return '<i class="fa-solid fa-book"></i>';
  if (text.includes("trabajar")) return '<i class="fa-solid fa-laptop"></i>';
  if (text.includes("comprar")) return '<i class="fa-solid fa-cart-shopping"></i>';

  return '<i class="fa-solid fa-list-check"></i>';
}

// 5️⃣ Render
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `<span class="task-text">${getIcon(task.text)} ${task.text}</span>`;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";

    completeBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.background = "#e53935";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// 6️⃣ Agregar tarea
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Escribí una tarea");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// 7️⃣ Eventos
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

clearPendingBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => task.completed);
  saveTasks();
  renderTasks();
});

// 8️⃣ Inicializar
renderTasks();


