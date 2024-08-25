// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999

    return `${timestamp}-${randomNum}`;
}

// created a function where the due date color changes based on the number of days until the due date
// if it falls within 5 days, the color will be red
// if it falls within 20 days, the color will be orange
// if it falls within 21 days or more, the color will be yellow
function dueDateColorChange(dueDate) {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const differenceTime = Math.abs(taskDueDate - currentDate);
    const differenceDays = Math.ceil(differenceTime / (1000 * 3600 * 24));

    if (differenceDays <= 5) {
        return 'red';
    } else if (differenceDays <= 20) {
        return 'orange';
    } else {
        return 'yellow';
    }
}


// Todo: create a function to render the task list and make cards draggable
// here we are using the map method to create a new array with the results of calling a provided function on every element in the calling array
function renderTaskList() {
    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = taskList.map(createTaskCard).join('');
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    // Get the values of the input fields
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;

    // generates a new task object with the provided title, description, and due date
    const newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        dueDate: dueDate
    };
    //  pushes task to taskList array and saves it to local storage
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    // clears all input fields after adding a task
    document.getElementById('taskForm').reset();

    // Hide the modal after adding a task
    $(`#formModal`).modal(`hide`);
}

// Todo: create a function to create a task card


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    var taskElement = event.target.closest('.task');
    if (taskElement) {
        // Remove the task from taskList
        // if task element is not found it will be null and will be skipped
        var taskId = taskElement.id;
        // creates a new array that only includes tasks that do not have the same id as the task id
        // removes the task from the taskList array and saves it to local storage
        taskList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(taskList));


        // Remove the task element from the DOM
        // if the task element is found, it will be removed
        taskElement.remove();
    } else {
        console.log('Task not found');
    }
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// funtion will be called when the page loads
$(document).ready(function () {

    // makes the todo, in-progress, and done lanes droppable
    // additional code under "create a task card" function
    $("#todo, #in-progress, #done").droppable({
        accept: ".task",
        tolerance: "intersect",
        drop: function (event, ui) {
            // this removes the blue and green classes from the card header and footer
            // when the card is dropped in a different field
            ui.draggable.detach().appendTo($(this));
            ui.draggable.find('.card-header, .card-footer').removeClass('blue green');
            // changes the color of the card header and footer based on the field it is dropped in
            if ($(this).attr('id') === 'in-progress') {
                ui.draggable.find('.card-header, .card-footer').addClass('blue');
            } else if ($(this).attr('id') === 'done') {
                ui.draggable.find('.card-header, .card-footer').addClass('green');
            }
        }
    });
});

