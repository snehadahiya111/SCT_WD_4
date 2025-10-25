let taskList = document.getElementById("taskList");


window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => showTask(task));
};

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let dateInput = document.getElementById("dateInput");

  let taskText = taskInput.value.trim();
  let taskDate = dateInput.value;

  if (taskText && taskDate) {
    let task = { text: taskText, date: taskDate, completed: false };
    saveTask(task);
    showTask(task);
    taskInput.value = "";
    dateInput.value = "";
  } else {
    alert("Please enter both task and date.");
  }
}

function showTask(task) {
  let li = document.createElement("li");
  li.className = task.completed ? "completed" : "";

  let taskContent = document.createElement("span");
  taskContent.innerHTML = `${task.text} <small>(${task.date})</small>`;

  let icons = document.createElement("div");
  icons.className = "icons";


  let completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✅";
  completeBtn.onclick = () => {
    task.completed = !task.completed;
    updateStorage();
    li.classList.toggle("completed");
  };


  let editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.onclick = () => {
    let newText = prompt("Edit task:", task.text);
    if (newText) {
      task.text = newText;
      updateStorage();
      taskContent.innerHTML = `${task.text} <small>(${task.date})</small>`;
    }
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(task);
  };

  icons.appendChild(completeBtn);
  icons.appendChild(editBtn);
  icons.appendChild(deleteBtn);

  li.appendChild(taskContent);
  li.appendChild(icons);
  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  let items = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    let span = li.querySelector("span");
    let fullText = span.innerHTML;
    let text = fullText.split(" <small>")[0];
    let dateMatch = fullText.match(/\((.*?)\)/);
    let date = dateMatch ? dateMatch[1] : "";

    let completed = li.classList.contains("completed");
    items.push({ text, date, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(items));
}

function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => !(task.text === taskToDelete.text && task.date === taskToDelete.date));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
