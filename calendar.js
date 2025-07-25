const calendar = document.getElementById("calendar");
const taskDisplay = document.getElementById("taskDisplay");
const monthYearLabel = document.getElementById("monthYear");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearLabel.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;

  calendar.innerHTML = "";

  // Fill blank days
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendar.appendChild(blank);
  }

  // Fill days with numbers
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;

    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const hasTasks = tasks.some(task => task.date === fullDate);
    if (hasTasks) {
      cell.style.backgroundColor = "#c3f584"; // Light green if tasks exist
    }

    cell.addEventListener("click", () => showTasksForDate(fullDate));
    calendar.appendChild(cell);
  }
}

function showTasksForDate(dateStr) {
  const filtered = tasks.filter(task => task.date === dateStr);

  taskDisplay.innerHTML = `<h2>Tasks for ${dateStr}</h2>`;
  if (filtered.length === 0) {
    taskDisplay.innerHTML += "<p>No tasks for this date.</p>";
  } else {
    const ul = document.createElement("ul");
    filtered.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${task.title}</strong> - ${task.description} (${task.category}, ${task.status})`;
      ul.appendChild(li);
    });
    taskDisplay.appendChild(ul);
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
}

renderCalendar(currentDate);
