// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) ;
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

// Todo: create a function to create a task card


// Todo: create a function to handle deleting a task


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

