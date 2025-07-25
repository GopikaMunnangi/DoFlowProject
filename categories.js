const taskContainer = document.getElementById("categoryTasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function filterByCategory(category) {
  const filtered = tasks.filter((task) => task.category === category);

  taskContainer.innerHTML = "";
  if (filtered.length === 0) {
    taskContainer.innerHTML = `<p>No tasks in ${category} category.</p>`;
    return;
  }

  filtered.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <div class="task-info">
        <h3>${task.title} (${task.status})</h3>
        <p>${task.description}</p>
        <p><strong>Date:</strong> ${task.date}</p>
      </div>
      <div class="task-actions">
        <button class="edit" onclick="editTask('${task.title}')">Edit</button>
        <button onclick="deleteTask('${task.title}')">Delete</button>
      </div>
    `;

    taskContainer.appendChild(taskDiv);
  });
}

function deleteTask(title) {
  tasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskContainer.innerHTML = "";
}

function editTask(title) {
  const index = tasks.findIndex((task) => task.title === title);
  if (index === -1) return;

  const newTitle = prompt("Edit Title", tasks[index].title);
  const newDescription = prompt("Edit Description", tasks[index].description);
  const newDate = prompt("Edit Date", tasks[index].date);
  const newCategory = prompt("Edit Category", tasks[index].category);

  if (newTitle && newDescription && newDate && newCategory) {
    tasks[index] = {
      ...tasks[index],
      title: newTitle,
      description: newDescription,
      date: newDate,
      category: newCategory,
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    filterByCategory(newCategory);
  }
}
