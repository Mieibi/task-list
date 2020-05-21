// State Variables
const form = document.querySelector('.task-form');
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearTask = document.querySelector(".clear-task");


// Load all event listener 
eventLoader();

//Load all events listener
function eventLoader(){

    //get tasks from Local Storage
    document.addEventListener("DOMContentLoaded", getTask);
    
    //add task event
    form.addEventListener('submit', addTask);

    //delete task event
    taskList.addEventListener('click', delTask); // Event Delegation

    //CLear tasks
    clearTask.addEventListener('click', clear);

    //Filter Tasks
    filter.addEventListener('keyup', filterTask);
};

//Get tasks from Local Storage
function getTask(){
    let tasks = testForStoredTasks()
    tasks.forEach(function(task){
        list(task);
    })
}

//ADD TASK
function addTask(add){

    //Test for value in input field
    if (taskInput.value === "") {
        alert('Add task');
    }else{
        // Create li element
        list(taskInput.value);

        //Storing Task in Local storage
        storingTask(taskInput.value);
    };
    // Clear input
    taskInput.value = "";

    //Preventing the button tag to behave in default
    add.preventDefault();
};

//create li element
function list(task) {
    const li = document.createElement("li");
    //add class name of li element
    li.className = "collection-item";
    //appending text from input to li element
    const textNode = document.createTextNode(task);
    li.appendChild(textNode);
    //creating link
    const a = document.createElement("a");
    //add class name to a tag
    a.className = "delete-item secondary-content";
    //adding icon to a tag
    a.innerHTML = '<i class="fa fa-remove"></i>';
    //adding a tag to li
    li.appendChild(a);
    //append li to ul
    taskList.appendChild(li);
}

//Storing Task
function storingTask(task){
    let tasks = testForStoredTasks();

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Test for stored tasks and parsing of tasks as an Array
function testForStoredTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}

// REMOVE TASK
function delTask(del) {

    //Target the "x" icon
    if (del.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            del.target.parentElement.parentElement.remove();

            //deleting task from storage
            delTaskFromLS( del.target.parentElement.parentElement);
        };
    };
};

//deleting task from storage
function delTaskFromLS(task){
    let tasks = testForStoredTasks()
    tasks.forEach(function(taskFromLS,index){
        if(task.textContent === taskFromLS){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

//CLEAR TASK
function clear() {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

        //clearing tasks from LS
        clearFromLS();
    };
};

function clearFromLS(){
    localStorage.clear();
}

//Filter Task

function filterTask(fil){
   const filterValue = fil.target.value.toLowerCase();

   const tasks = document.querySelectorAll(".collection-item");
    tasks.forEach(function(task){
        const item = task.firstChild.textContent.toLowerCase();
       if (item.indexOf(filterValue) != -1) {
           task.style.display = "block";
       }else{
           task.style.display = "none";
       }
   });
};