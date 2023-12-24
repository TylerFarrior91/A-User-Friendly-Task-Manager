function addTask() {
    var taskInput = document.getElementById("new-task");
    var dueDateInput = document.getElementById("due-date");
    
    var taskText = taskInput.value;
    var dueDate = dueDateInput.value;
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    var taskList = document.getElementById("task-list");
    var newTask = document.createElement("li");
    
    // Create a checkbox for task completion
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        updateTaskStatus(this);
    });

    // Create a span for task text
    var taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Create a span for due date
    var dueDateSpan = document.createElement("span");
    dueDateSpan.textContent = `Due Date: ${dueDate}`;

    // Create a button to remove the task
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
        removeTask(this);
    });

    // Append elements to the new task item
    newTask.appendChild(checkbox);
    newTask.appendChild(taskSpan);
    newTask.appendChild(dueDateSpan);
    newTask.appendChild(removeButton);

    // Append the new task item to the task list
    taskList.appendChild(newTask);

    // Clear input fields
    taskInput.value = "";
    dueDateInput.value = "";

    // Schedule a notification if a due date is provided
    if (dueDate) {
        scheduleNotification(taskText, dueDate);
    }
}

function removeTask(btn) {
    var listItem = btn.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

function updateTaskStatus(checkbox) {
    var taskText = checkbox.nextSibling.textContent;
    var status = checkbox.checked ? "completed" : "incomplete";
    alert(`Task "${taskText}" marked as ${status}.`);
}

function scheduleNotification(taskText, dueDate) {
    var now = new Date();
    var dueDateObj = new Date(dueDate);

    if (dueDateObj > now) {
        var timeDifference = dueDateObj - now;
        setTimeout(function() {
            showNotification(`Task due: ${taskText}`);
        }, timeDifference);
    }
}

function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(message);
    } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}
