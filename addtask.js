document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  if (title && description && date && category) {
    const task = {
      title,
      description,
      date,
      category,
      status: "Pending",
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task added successfully!");
    document.getElementById("taskForm").reset();
  }
});
