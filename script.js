const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskTable = document.getElementById("taskTable");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filterDate = "") {
  taskTable.innerHTML = "";

  const filteredTasks = filterDate
    ? tasks.filter((task) => task.date === filterDate)
    : tasks;

  if (filteredTasks.length === 0) {
    taskTable.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date || "-"}</td>
      <td>${task.completed ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;

    taskTable.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text) return alert("Please enter a task.");

  tasks.push({ text, date, completed: false });
  saveTasks();
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function filterTasks() {
  const filterDate = dateInput.value;
  renderTasks(filterDate);
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTasks);

renderTasks();