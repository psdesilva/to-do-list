// ---------------------- QUERY THE DOM FOR REQUIRED ELEMENTS ---------------------------------------
const addTaskButton = document.querySelector('#submit');
const currentTaskList = document.querySelector("#current-task-list");
const completedTaskList = document.querySelector("#completed-task-list");

// ----------------------- CREATE NEW TASK LISTS OR FETCH FROM LOCAL STORAGE -------------------------
const LOCAL_STORAGE_CURRENT_TASKS_KEY = 'current.tasks.list'
let currentTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_TASKS_KEY)) || []

const LOCAL_STORAGE_COMPLETED_TASKS_KEY = 'completed.tasks.list'
let completedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPLETED_TASKS_KEY)) || []

// ------------------------------------ ADD NEW TASK --------------------------------------------------
addTaskButton.addEventListener('click', submitTask)

function submitTask(e) {
    e.preventDefault();
    const inputField = document.querySelector('#task-name')
    const taskName = inputField.value;

    if(taskName === null || taskName === '') return;

    const task = createTask(taskName)

    inputField.value = null;

    currentTasks.push(task)

    saveAndRenderCurrentTasks()
}

// --------------------------------- RENDER TASKS -----------------------------------------------------
function renderCurrentTasks() {
    clearElement(currentTaskList) 
    currentTasks.forEach(task => {
        const newTask = document.createElement("li")
        newTask.classList.add("task")
        newTask.setAttribute("id", task.taskDate)

        const taskNameParagraph = document.createElement("p")
        const newTaskName = document.createTextNode(task.taskName)
        taskNameParagraph.appendChild(newTaskName)

        const taskDateParagraph = document.createElement("p")
        const newTaskDate = document.createTextNode(`Added on: ${task.taskDate}`)
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
    })
}

function renderCompletedTasks () {
    clearElement(completedTaskList)
    completedTasks.forEach(task => {
        const newTask = document.createElement("li")
        newTask.classList.add("task")
        newTask.setAttribute("id", task.taskDate)

        const taskNameParagraph = document.createElement("p")
        const newTaskName = document.createTextNode(task.taskName)
        taskNameParagraph.appendChild(newTaskName)

        const taskDateParagraph = document.createElement("p")
        const newTaskDate = document.createTextNode(`Added on: ${task.taskDate}`)
        taskDateParagraph.appendChild(newTaskDate)

        const taskCompletedDateParagraph = document.createElement("p")
        const newTaskCompletedDate = document.createTextNode(`Completed on: ${task.taskCompleteDate}`)
        taskCompletedDateParagraph.appendChild(newTaskCompletedDate)

        const taskDetails = document.createElement("div")
        taskDetails.classList.add("task-details")
        taskDetails.appendChild(taskNameParagraph)
        taskDetails.appendChild(taskDateParagraph)
        taskDetails.appendChild(taskCompletedDateParagraph)

        const deleteButton = document.createElement("div")
        deleteButton.classList.add("delete-button")
        const deleteIcon = document.createTextNode("X")
        deleteButton.appendChild(deleteIcon)

        newTask.appendChild(taskDetails)
        newTask.appendChild(deleteButton)
        completedTaskList.appendChild(newTask)

        if(completedTaskList.hasChildNodes()) {
            document.querySelector('#no-completed-tasks').style.display = 'none'
        }
    })
}

//----------------------------------------- UTILITIES ----------------------------------------------------
function createTask (name) {
    return { taskName: name, taskDate: new Date().toLocaleString() }
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

//------------------------------- FUNCTION TO COMBINE SAVE AND RENDER ------------------------------------
function saveAndRenderCurrentTasks () {
    saveCurrentTasks();
    renderCurrentTasks();
    if(currentTaskList.hasChildNodes()) {
        document.querySelector('#no-current-tasks').style.display = 'none'
    } else {
        document.querySelector('#no-current-tasks').style.display = 'block'
    }
}

function saveAndRenderCompletedTasks () {
    saveCompletedTasks();
    renderCompletedTasks();
    if(completedTaskList.hasChildNodes()) {
        document.querySelector('#no-completed-tasks').style.display = 'none'
    } else {
        document.querySelector('#no-completed-tasks').style.display = 'block'
    }
}


// ------------------------------------ SAVE TASKS TO LOCAL STORAGE -----------------------------------------
function saveCurrentTasks() {
    localStorage.setItem(LOCAL_STORAGE_CURRENT_TASKS_KEY, JSON.stringify(currentTasks))
}

function saveCompletedTasks() {
    localStorage.setItem(LOCAL_STORAGE_COMPLETED_TASKS_KEY, JSON.stringify(completedTasks))
}

// ------------------------------------- MARK TASK AS COMPLETE ------------------------------------------------
currentTaskList.addEventListener("dblclick", markAsComplete)

function markAsComplete(e) {
    if (e.target.classList.contains('task')) {
        console.log(e.target.id)
        currentTasks.forEach(task => {
            if (task.taskDate == e.target.id) {
                task.taskCompleteDate = new Date().toLocaleString()
                completedTasks.push(task)
                saveAndRenderCompletedTasks();
            }
        })
        currentTasks = currentTasks.filter(task => task.taskDate !== e.target.id)
    }
    saveAndRenderCurrentTasks();
}

// ---------------------------------------- DELETE TASKS ------------------------------------------------------
currentTaskList.addEventListener("click", deleteCurrentTask)

function deleteCurrentTask(e) {
    if (e.target.classList.contains('delete-button')) {
        currentTasks = currentTasks.filter(task => task.taskDate !== e.target.parentNode.id)
    } else {
        return false
    }
    saveAndRenderCurrentTasks();
}

completedTaskList.addEventListener("click", deleteCompletedTask)

function deleteCompletedTask(e) {
    if (e.target.classList.contains('delete-button')) {
        completedTasks = completedTasks.filter(task => task.taskDate !== e.target.parentNode.id)
    }
    saveAndRenderCompletedTasks();
}

// ------------------------- RENDER EXISTING TASKS ON PAGE LOAD ------------------------------------------------
saveAndRenderCurrentTasks();
saveAndRenderCompletedTasks();