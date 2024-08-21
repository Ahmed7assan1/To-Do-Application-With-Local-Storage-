let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arr = [];

// Check if There Are Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arr = JSON.parse(localStorage.getItem("tasks"));
}

// Load Tasks From Local Storage
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Clear Input Field
  }
};

// Handle Task Clicks
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.tagName === "SPAN") {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element (Toggle Completed Status)
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arr.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arr);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arr);
}

function addElementsToPageFrom(arr) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Loop Over Array Of Tasks
  arr.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arr = arr.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arr);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == taskId) {
      arr[i].completed = !arr[i].completed;
    }
  }
  addDataToLocalStorageFrom(arr);
}
