// define ui varivable
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

// load all event listeners
loadEventListeners();
// load all eventlisteners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    tasklist.addEventListener('click', removeTask);
    // clear task
    clear.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}
// get tasks from ls


function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {

        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create textnodes
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append the link to li
        li.appendChild(link);

        // append li to ul 
        tasklist.appendChild(li);
    });
}

// add task
function addTask(e) {
    if (taskinput.value === '') {
        alert("add a new task");
    }

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create textnodes
    li.appendChild(document.createTextNode(taskinput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append li to ul 
    tasklist.appendChild(li);

    // localstorage 
    storeTasksInLocalStorage(taskinput.value);

    // clear input  
    taskinput.value = '';

    e.preventDefault();
}

// store tasks
function storeTasksInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task list function
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are You Sure Want To Delete This Item??")) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromlocalStorage(e.target.parentElement.parentElement);
            // remove from localstorage

        }
    }
}

// remove tasks from localstorage
function removeTaskFromlocalStorage(taskItem) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
    //tasklist.innerHTML = '';
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    // clear local storage
    clearTasklocalStorage()
}
// clear tasks localstorage

function clearTasklocalStorage() {
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });
}