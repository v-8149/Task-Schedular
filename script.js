let tasks = [];

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDuration = document.getElementById('task-duration').value;
    const taskDeadline = document.getElementById('task-deadline').value;
    const taskTime = document.getElementById('task-time').value;

    // Check if all fields are filled
    if (!taskName || !taskPriority || !taskDuration || !taskDeadline || !taskTime) {
        alert('Please fill in all fields.');
        return;
    }

    const task = {
        id: Date.now(), // Unique task ID
        name: taskName,
        priority: taskPriority,
        duration: taskDuration,
        deadline: taskDeadline + 'T' + taskTime
    };

    tasks.push(task);
    displayTasks();

    // Optionally, send task to server for email scheduling
    fetch('/schedule-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the server response
    })
    .catch(error => console.error('Error:', error));

    // Clear form fields
    document.getElementById('task-name').value = '';
    document.getElementById('task-priority').value = '';
    document.getElementById('task-duration').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('task-time').value = '';
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong><br>
                Priority: ${task.priority} | Duration: ${task.duration} hours<br>
                Deadline: ${task.deadline}
            </div>
            <div>
                <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);

    // Populate form with task details for editing
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-duration').value = task.duration;
    document.getElementById('task-deadline').value = task.deadline.split('T')[0];
    document.getElementById('task-time').value = task.deadline.split('T')[1];

    // Remove task from list to update with new values
    deleteTask(id);
}
