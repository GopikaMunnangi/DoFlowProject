let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "All";

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (currentFilter !== "All" && task.status !== currentFilter) return;

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <div class="task-info">
        <h3>${task.title} (${task.status})</h3>
        <p>${task.description}</p>
        <p><strong>Date:</strong> ${task.date}</p>
        <p><strong>Category:</strong> ${task.category}</p>
      </div>
      <div class="task-actions">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="toggleStatus(${index})">${task.status === "Pending" ? "Mark Completed" : "Mark Pending"}</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

function filterTasks(status) {
  currentFilter = status;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "Pending" ? "Completed" : "Pending";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const newTitle = prompt("Edit Title", tasks[index].title);
  const newDescription = prompt("Edit Description", tasks[index].description);
  const newDate = prompt("Edit Date", tasks[index].date);
  const newCategory = prompt("Edit Category", tasks[index].category);

  if (newTitle && newDescription && newDate && newCategory) {
    tasks[index].title = newTitle;
    tasks[index].description = newDescription;
    tasks[index].date = newDate;
    tasks[index].category = newCategory;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

renderTasks();
