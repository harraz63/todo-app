var taskInput =  document.getElementById("taskInput");
var taskButton =  document.getElementById("taskButton");
var tasks = document.getElementById("tasks");

taskButton.addEventListener("click", function() {
  var task = {
    title: taskInput.value,
    apiKey: "6668ade360a208ee1fdbb1b2"
  }
  addToDo(task);
})

async function addToDo(task) {
  var response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "POST", 
    body: JSON.stringify(task),
    headers: {'content-type': 'application/json'}
  });
  var data = await response.json();

  if(data.message === "success") {
    getAllToDos();
  }
  console.log(data);
}

async function getAllToDos(task) {
  var response = await fetch("https://todos.routemisr.com/api/v1/todos/6668ade360a208ee1fdbb1b2");
  var data = await response.json();
  console.log(data);

  if(data.message === "success") {
    displayData(data.todos)
  }
}

async function deleteToDo(id) {
  var response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "DELETE", 
    body: JSON.stringify({todoId: id}),
    headers: {'content-type': 'application/json'}
  });
  var data = await response.json();

  if(data.message === "success") {
    getAllToDos();
  }
  console.log(data);
}

async function markCompleted(id) {
  var response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "PUT", 
    body: JSON.stringify({todoId: id}),
    headers: {'content-type': 'application/json'}
  });
  var data = await response.json();

  if(data.message === "success") {
    getAllToDos();
  }
  console.log(data);
}

function displayData(data) {
  var cartona = ``;

  for (var i = 0; i < data.length; i++) {
    cartona += `
      <div class="task ${data[i].completed ? "bg-danger " : ""} my-3 px-4 py-2 d-flex justify-content-between w-75 m-auto shadow align-items-center p-4 rounded-4">
        <div>
          <p class="task-text m-0 p-0 ${data[i].completed ? "text-decoration-line-through" : ""}">${data[i].title}</p>
        </div>

        <div>
          <i onclick="markCompleted('${data[i]._id}')" class="fa-regular fa-circle-check ${data[i].completed ? "d-none" : ""}"></i>
          <i onclick="deleteToDo('${data[i]._id}')" class="fa-solid fa-trash"></i>
        </div>
      </div>
    `
  }

  tasks.innerHTML = cartona;
}



