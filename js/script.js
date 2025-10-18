/// Database permanent storage can be implemented later using localStorage or IndexedDB
let tasksDb = [];

//set footer year dynamically
document.getElementById('footer-year').textContent = new Date().getFullYear();  

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
        }

        /// Add to database 
        tasksDb.push(newTask);
        renderTask(tasksDb);

        //clear input fields
        taskInput.value = '';
        taskDate.value = '';
    }
}

function renderTask(tasks) {    
    const todoList = document.getElementById('task-list');
    todoList.innerHTML = '';

    //order tasks by date ascending
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    tasks.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'border rounded p-2 my-2 flex justify-between items-center';
        listItem.innerHTML = `
            <span>${item.task} - ${item.date}</span>
            <button class="bg-red-500 text-white p-1 rounded" onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(listItem);
    });
}

function deleteTask(index) {
    tasksDb.splice(index, 1);
    renderTask(tasksDb);
}

function deleteAllTasks() {
    //check if list is empty
    if (tasksDb.length === 0) {
        alert('No tasks to delete.');
        return;
    }
    tasksDb = [];
    renderTask(tasksDb);
 }

function filterTasks() {
    const today = new Date().toISOString().split('T')[0];
    const filteredTasks = tasksDb.filter(task => task.date === today);
    renderTask(filteredTasks);
 }

function resetFilter() {
    renderTask(tasksDb);
 }  

function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}