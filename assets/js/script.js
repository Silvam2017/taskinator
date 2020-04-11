var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
// initialize counter at 0
var taskIdCounter = 0;

var taskFormHandler = function() {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
  
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        listItemEl.appendChild(taskInfoEl);

        var taskActionsEl = createTaskActions(taskIdCounter);
        listItemEl.appendChild(taskActionsEl);

        tasksToDoEl.appendChild(listItemEl);

        // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    //increase task cunter for next unique ID
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    //create div to contain new task actions
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    //add button to div
    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    //add button to div
    actionContainerEl.appendChild(deleteButtonEl);

    //create select dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    // var i=0 defines an initial counter(iterator)
    // i <statusChoices.Length keeps the for loop running by checking the iterator against the number of items in the array (length)
    // i++ increments the counter by one after each loop iteration
    //statusChoices[i] returns the value of the array at the given index ie: i=0 means statusChoices[0] equals "To Do".

    for (var i=0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);