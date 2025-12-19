// ===============================
// ELEMENTOS DEL DOM
// ===============================
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearPendingBtn = document.getElementById("clearPending");

// ===============================
// DICCIONARIO DE ICONOS
// ===============================
const iconMap = {
  comer: "fa-utensils",
  leer: "fa-book",
  estudiar: "fa-graduation-cap",
  trabajar: "fa-briefcase",
  cocinar: "fa-kitchen-set",
  entrenar: "fa-dumbbell",
  gym: "fa-dumbbell",
  dormir: "fa-bed",
  comprar: "fa-cart-shopping",
  limpiar: "fa-broom",
  programar: "fa-code",
};

// ===============================
// FUNCIONES
// ===============================

// Devuelve un icono según el texto
function getIconForTask(text) {
  const lowerText = text.toLowerCase();

  for (let key in iconMap) {
    if (lowerText.includes(key)) {
      return iconMap[key];
    }
  }

  return "fa-circle"; // icono por defecto
}

// Actualiza el contador
function updateCounter() {
  const completedTasks = document.querySelectorAll("li.completed");
  counter.textContent = `Tareas completadas: ${completedTasks.length}`;
}

// Crea una tarea
function createTask(text) {
  const li = document.createElement("li");

  // Texto + icono
  const taskText = document.createElement("span");
  taskText.className = "task-text";

  const iconClass = getIconForTask(text);
  taskText.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${text}`;

  // Botón completar
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.className = "complete-btn";

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateCounter();
  });

  // Botón eliminar
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  li.appendChild(taskText);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  updateCounter();
}

// ===============================
// EVENTOS
// ===============================
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  createTask(text);
  taskInput.value = "";
});

clearCompletedBtn.addEventListener("click", () => {
  document.querySelectorAll("li.completed").forEach(li => li.remove());
  updateCounter();
});

clearPendingBtn.addEventListener("click", () => {
  document.querySelectorAll("li:not(.completed)").forEach(li => li.remove());
  updateCounter();
});
// ===============================
// AGREGAR TAREA CON ENTER
// ===============================
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});
