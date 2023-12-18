function addTask() {
    var taskInput = document.getElementById("new-task");
    var dueDateInput = document.getElementById("due-date");
    
    var taskText = taskInput.value;
    var dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }