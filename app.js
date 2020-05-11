// State Variables
const form = document.querySelector('.task-form');
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearTask = document.querySelector(".clear-tasks");


// Load all event listener 
eventLoader();

//Load all events listener
function eventLoader(){
    
    //add task event
    form.addEventListener('submit', addTask);

    // //delete task event
    // taskList.addEventListener('click', delTask);
}

function addTask(add){

    //Test for value in input field
    if (taskInput.value === "") {
        alert('Add task');
    }

    // Create li element
    const li = document.createElement("li");

    //add class name of li element
    li.className = "collection-item";

    //appending text from input to li element
    const textNode = document.createTextNode(taskInput.value)
    li.appendChild(textNode);

    //creating link
    const a = document.createElement("a");

    //add class name to a tag
    a.className = "delete-item secondary-content"

    //adding icon to a tag
    a.innerHTML = '<i class="fa fa-remove"></i>'

    //adding a tag to li
    li.appendChild(a);

    //append li to ul
    taskList.appendChild(li);

    // Clear input
    taskInput.value = ""

    //Preventing the button tag to behave in default
    add.preventDefault();
}
