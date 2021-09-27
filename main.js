// ADD NEW TASK

const addTaskButton = document.querySelector('#submit');

addTaskButton.addEventListener('click', submitTask)

// let taskId = 1;
function submitTask(e) {
    const inputField = document.querySelector('#task-name')
    if (inputField.value !== '') {
        e.preventDefault();
        let taskName = inputField.value;

        const currentTasks = document.querySelector('#current-task-list')
        const newTask = document.createElement("li")
        // newTask.setAttribute("id", taskId);
        newTask.classList.add("task")

        const taskNameParagraph = document.createElement("p")
        const newTaskName = document.createTextNode(taskName)
        taskNameParagraph.appendChild(newTaskName)

        const taskDateParagraph = document.createElement("p")
        const newTaskDate = document.createTextNode(`Added on: ${new Date().toLocaleString()}`)
        taskDateParagraph.appendChild(newTaskDate)

        const taskDetails = document.createElement("div")
        taskDetails.classList.add("task-details")
        taskDetails.appendChild(taskNameParagraph)
        taskDetails.appendChild(taskDateParagraph)

        const deleteButton = document.createElement("div")
        deleteButton.classList.add("delete-button")
        const deleteIcon = document.createTextNode("X")
        deleteButton.appendChild(deleteIcon)

        newTask.appendChild(taskDetails)
        newTask.appendChild(deleteButton)
        currentTasks.appendChild(newTask)

        // taskId++;
        inputField.value = '';
    } else {
        window.alert("Please enter Task Name");
    }
}

// MARK TASK AS COMPLETE

const currentTaskList = document.querySelector("#current-task-list");

currentTaskList.addEventListener("dblclick", markAsComplete)

function markAsComplete(e) {
    if (e.target.classList.contains('task')) {
        const completedTasks = document.querySelector('#completed-task-list')

        const taskCompleteParagraph = document.createElement("p")
        const taskCompleteDate = document.createTextNode(`Completed on: ${new Date().toLocaleString()}`)
        taskCompleteParagraph.appendChild(taskCompleteDate)

        e.target.firstChild.appendChild(taskCompleteParagraph)

        completedTasks.appendChild(e.target)
    }
}

// DELETE TASK

const completedTaskList = document.querySelector("#completed-task-list");
currentTaskList.addEventListener("click", deleteTask)
completedTaskList.addEventListener("click", deleteTask)

function deleteTask(e) {
    if (e.target.classList.contains('delete-button')) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    }
}

function isEmpty (domElement, text) {
    if (!domElement.hasChildNodes()) {
        domElement.innerText = text
    }
}

isEmpty(currentTaskList, "No Current Tasks to Display");
isEmpty(completedTaskList, "No Completed Tasks to Display");