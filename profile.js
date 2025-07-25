// Load profile data
window.onload = function () {
  document.getElementById("name").value = localStorage.getItem("name") || "";
  document.getElementById("email").value = localStorage.getItem("email") || "";
  document.getElementById("profileImage").src = localStorage.getItem("profileImage") || "default-user.png";

  const total = 12;
  const completed = 9;
  const pending = total - completed;

  document.getElementById("totalTasks").innerText = total;
  document.getElementById("completedTasks").innerText = completed;

  const progress = Math.floor((completed / total) * 100);
  document.getElementById("progress").style.width = progress + "%";

  // Set last login time
  const now = new Date();
  document.getElementById("lastLogin").innerText = now.toLocaleString();
  localStorage.setItem("lastLogin", now.toLocaleString());

  // Set account created date
  if (!localStorage.getItem("createdOn")) {
    localStorage.setItem("createdOn", now.toLocaleDateString());
  }
  document.getElementById("createdOn").innerText = localStorage.getItem("createdOn");

  // Session timer
  let seconds = 0;
  setInterval(() => {
    seconds++;
    document.getElementById("sessionTime").innerText = seconds;
  }, 1000);
};

// Save profile info
function saveProfile() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  localStorage.setItem("name", name);
  localStorage.setItem("email", email);

  alert("✅ Profile saved successfully!");
}

// Upload image
function uploadImage() {
  const file = document.getElementById("upload").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const imgData = reader.result;
    localStorage.setItem("profileImage", imgData);
    document.getElementById("profileImage").src = imgData;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// Toggle Dark Mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Logout
function logout() {
  alert("Logged out!");
  window.location.href = "HomePage.html";
}
