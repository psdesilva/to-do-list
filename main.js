// ADD NEW TASK

const addTaskButton = document.querySelector('#submit');
const currentTaskList = document.querySelector("#current-task-list");
const completedTaskList = document.querySelector("#completed-task-list");

addTaskButton.addEventListener('click', submitTask)

function submitTask(e) {
    const inputField = document.querySelector('#task-name')
    if (inputField.value !== '') {
        e.preventDefault();
        let taskName = inputField.value;

        const newTask = document.createElement("li")
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
        currentTaskList.appendChild(newTask)

        console.log(currentTaskList.childNodes)

        if(currentTaskList.hasChildNodes()) {
            document.querySelector('#no-current-tasks').style.display = 'none'
        }

        inputField.value = '';
    } else {
        window.alert("Please enter Task Name");
    }
}

// MARK TASK AS COMPLETE

currentTaskList.addEventListener("dblclick", markAsComplete)

function markAsComplete(e) {
    if (e.target.classList.contains('task')) {
        const taskCompleteParagraph = document.createElement("p")
        const taskCompleteDate = document.createTextNode(`Completed on: ${new Date().toLocaleString()}`)
        taskCompleteParagraph.appendChild(taskCompleteDate)

        e.target.firstChild.appendChild(taskCompleteParagraph)

        completedTaskList.appendChild(e.target)
    }

    if(!currentTaskList.hasChildNodes()) {
        document.querySelector('#no-current-tasks').style.display = 'block'
    }

    if(completedTaskList.hasChildNodes()) {
        document.querySelector('#no-completed-tasks').style.display = 'none'
    }
}

// DELETE TASK

currentTaskList.addEventListener("click", deleteTask)
completedTaskList.addEventListener("click", deleteTask)
const currentTasksSection = document.querySelector("#current-tasks")

function deleteTask(e) {
    if (e.target.classList.contains('delete-button')) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    }

    if(!currentTaskList.hasChildNodes()) {
        document.querySelector('#no-current-tasks').style.display = 'block'
    }

    if(!completedTaskList.hasChildNodes()) {
        document.querySelector('#no-completed-tasks').style.display = 'block'
    }
}