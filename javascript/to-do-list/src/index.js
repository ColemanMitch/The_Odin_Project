// index.js
/* 

All of the application-related functionality of this project 

*/
// fix toggle feature localStorage. Append the links for projects that exists

/* TODO: A way to edit PLs?
/
/ Sort todos based on name and due date 
/ delete button for project lists (when PLs are empty...)
/ 
*/

// Factory function for ToDo object

let toDoID = 0;
let projectListID = 0;
const createToDo = ({
    id,
    title,
    desc,
    project,
    dueDate,
    priority,
    complete,
}) => ({
    id,
    title,
    desc,
    project,
    dueDate,
    priority,
    complete,

    toggleComplete() {
        this.complete = !complete;
    },
    changePriority() {
        this.priority = 3; // want this to be configurable with a dropdown
    },
});

// Factory function for Project List object
const createProjectList = ({
    id,
    title,
    toDos
}) => ({
    title,
    toDos,

    pushToDo(newToDo) {
        this.toDos.push(newToDo);
        return this;
    },
    deleteToDo(index) {
        this.toDos.splice(index, 1);
        return this;
    },
});

const toDoUser = ({
    projects
}) => ({
    projects,

    addProject(newProj) {
        this.projects.push(newProj);
        return this;
    },
    deleteProject(index) {
        this.projects.splice(index, 1);
        return this;
    },
});

// Creating dummy tasks (ToDos)
let task0 = createToDo({
    id: toDoID++,
    title: "Laundry",
    desc: "My clothes is dirty!",
    project: "Tasks",
    dueDate: "2020-12-03",
    priority: 2,
    complete: false,
});
let task1 = createToDo({
    id: toDoID++,
    title: "Vacuum",
    desc: "The rug is grody!",
    project: "Tasks",
    dueDate: "2020-12-03",
    priority: 3,
    complete: true,
});

// Adding them to project
let project0 = createProjectList({
    id: projectListID++,
    title: "Tasks",
    toDos: [task0, task1],
});

// Default project list
let project1 = createProjectList({
    id: projectListID++,
    title: "",
    toDos: [],
});

let user1;

if (window.localStorage.getItem("user")) {
    console.log("Local Storage of user exists");
    //window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));
    console.log(user1);
} else {
    console.log("Local Storage of user don't exists");
    user1 = toDoUser({
        projects: [project0, project1],
    });
    window.localStorage.setItem("user", JSON.stringify(user1));
}

for (let p of user1.projects) {
    const plList = document.getElementById("projects-list");
    if (p.title !== "") {
        let plLink = document.createElement("a");
        plLink.setAttribute("class", "nav-link collapsed");
        plLink.id = String(p.title) + "-pl";
        plLink.addEventListener("click", toggleProjectListsDOM, true);
        plLink.innerHTML = p.title;
        plList.appendChild(plLink);
    }
}

showAllToDos();
document
    .getElementById("Tasks-pl")
    .addEventListener("click", toggleProjectListsDOM, true);

// ------------------------- Initializing dummy data ---------------------------

//window.onbeforeunload = function() {
//  localStorage.clear();}

console.log(true);

function addToDo() {
    let projectListName = document.getElementById("project-list-header")
        .innerText;
    let newTitle = document.getElementById("new-to-do").value;
    let newDesc = document.getElementById("new-desc").value;
    let newDueDate = document.getElementById("new-due-date").value;
    let newPriority = document.getElementById("new-priority").value;
    if (projectListName === "All ToDos") {
        projectListName = "";
    }

    // Create new todo object
    let newToDo = createToDo({
        id: toDoID++,
        title: newTitle,
        desc: newDesc,
        project: projectListName,
        dueDate: newDueDate,
        priority: newPriority,
        complete: false,
    });
    let currentProject = user1.projects.filter(
        (p) => p.title === projectListName
    )[0];
    console.log(currentProject);
    console.log(newTitle);

    // Check if todo title already exists in project list
    if (
        currentProject.toDos.filter((t) => t.title === newToDo.title).length < 1
    ) {
        currentProject.toDos.push(newToDo);
        window.localStorage.setItem("user", JSON.stringify(user1));
        user1 = JSON.parse(window.localStorage.getItem("user"));
        //console.log(newToDo)
        addToDoDOM(newToDo);
    } else {
        alert("ToDo with this name already exists on this list!");
    }
}

function deleteToDo() {
    let currentProject;
    let toDoTitleRemove = this.parentNode.parentNode.childNodes[1].innerText;
    let projectListName = document.getElementById("project-list-header")
        .innerText;
    if (projectListName !== "All ToDos") {
        currentProject = user1.projects.filter(
            (p) => p.title === projectListName
        )[0];
    } else {
        let deleteID = this.parentNode.parentNode.dataset.id;
        for (let p of user1.projects) {
            for (let t of p.toDos) {
                if (String(t.id) === String(deleteID)) {
                    currentProject = p;
                }
            }
        }
    }

    for (let i = 0; i < currentProject.toDos.length; i++) {
        //console.log(todo);
        if (currentProject.toDos[i].title === toDoTitleRemove) {
            //console.log('remove ', currentProject.toDos[i]);
            currentProject.toDos.splice(i, 1);
            break;
        }
    }
    // drops the row from the DOM
    this.parentNode.parentNode.remove();
    window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));
}

// // Toggles complete for selected todo and then passes it into DOM manipulating function
function toggleComplete() {
    let toDoToggleText = this.parentNode.parentNode.parentNode.childNodes[1]
        .innerText;
    let projectListName = document.getElementById("project-list-header")
        .innerText;
    let toDoToggleNode = this.parentNode.parentNode.parentNode.childNodes[1];
    let toDoToggleNodeDueDate = this.parentNode.parentNode.parentNode
        .childNodes[2];
    this.parentNode.parentNode.parentNode.childNodes[1];
    let currentProject; //= user1.projects.filter(p => p.title === projectListName)[0];

    //window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));

    if (projectListName !== "All ToDos") {
        currentProject = user1.projects.filter(
            (p) => p.title === projectListName
        )[0];
    } else {
        let toggleID = this.parentNode.parentNode.parentNode.dataset.id;
        console.log(toggleID);
        for (let p of user1.projects) {
            for (let t of p.toDos) {
                if (String(t.id) === String(toggleID)) {
                    currentProject = p;
                }
            }
        }
    }
    let complete;
    let priority;

    for (let i = 0; i < currentProject.toDos.length; i++) {
        if (currentProject.toDos[i].title === toDoToggleText) {
            currentProject.toDos[i].complete = !currentProject.toDos[i].complete;
            complete = currentProject.toDos[i].complete;
            priority = currentProject.toDos[i].priority;
            break;
        }
    }
    window.localStorage.setItem("user", JSON.stringify(user1));
    //user1 = JSON.parse(window.localStorage.getItem("user"));
    toggleCompleteDOM(toDoToggleNode, toDoToggleNodeDueDate, complete, priority);
}

// Toggles strikethrough for completed nodes
function toggleCompleteDOM(titleNode, dueDateNode, complete, priority) {
    if (complete) {
        titleNode.style.textDecoration = "line-through";
        dueDateNode.style.textDecoration = "line-through";
        titleNode.parentNode.style.backgroundColor = "#c6f78d";
    } else {
        titleNode.style.textDecoration = "initial";
        dueDateNode.style.textDecoration = "initial";
        if (String(priority) === String(3)) {
            titleNode.parentNode.style.backgroundColor = "#f78d8d";
        } else if (String(priority) === String(2)) {
            titleNode.parentNode.style.backgroundColor = "#f7c68d";
        } else if (String(priority) === String(1)) {
            titleNode.parentNode.style.backgroundColor = "#f7f38d";
        } else {
            console.log("back to normal color");
            titleNode.parentNode.style.backgroundColor = "#F8F9FC";
        }
    }
}

// Adds a ToDo to the DOM a new tr on the table
function addToDoDOM(toDo) {
    let table = document.getElementById("to-dos-table");
    let newRow = document.createElement("tr");
    newRow.dataset.id = toDo.id;

    if (String(toDo.priority) === String(3)) {
        newRow.style.backgroundColor = "#f78d8d";
    } else if (String(toDo.priority) === String(2)) {
        newRow.style.backgroundColor = "#f7c68d";
    } else if (String(toDo.priority) === String(1)) {
        newRow.style.backgroundColor = "#f7f38d";
    }
    newRow.setAttribute("class", "odd");
    newRow.setAttribute("role", "row");

    let tCell1 = document.createElement("td");
    tCell1.setAttribute("colspan", "1");
    let checkBox = document.createElement("form");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.style.cursor = "pointer";
    input.addEventListener("click", toggleComplete, true);

    checkBox.appendChild(input);
    tCell1.append(checkBox);

    let tCell2 = document.createElement("td");
    tCell2.setAttribute("colspan", "8");
    tCell2.textContent = toDo["title"];

    let tCell3 = document.createElement("td");
    tCell3.setAttribute("colspan", "2");
    tCell3.textContent = toDo["dueDate"];

    let tCell4 = document.createElement("td");
    tCell4.setAttribute("colspan", "1");
    let edit = document.createElement("i");
    edit.setAttribute("class", "fas fa-edit");
    edit.dataset.toggle = "modal";
    edit.dataset.target = "#to-do-edit-modal";
    edit.style.cursor = "pointer";

    let trash = document.createElement("i");
    trash.setAttribute("class", "fas fa-trash-alt");
    trash.style.cursor = "pointer";
    trash.addEventListener("click", deleteToDo, true);

    tCell4.appendChild(edit);
    tCell4.appendChild(trash);

    newRow.appendChild(tCell1);
    newRow.appendChild(tCell2);
    newRow.appendChild(tCell3);
    newRow.appendChild(tCell4);

    table.append(newRow);
    $("#to-do-modal").modal("hide");
    document.getElementById("to-do-form").reset();
}

/* function listAllToDos() {
    console.log('were going to work on this!');
} */

function addProjectList() {
    // need to add this to user profile. Done it's added to user1 in
    console.log("this should add a new project list");
    let newTitle = document.getElementById("newProjectList").value;
    let newProjectList = createProjectList({
        title: newTitle,
        toDos: [],
    });

    if (user1.projects.filter((p) => p.title === newTitle).length < 1) {
        user1.projects.push(newProjectList);
        console.log(newProjectList);
        console.log(user1);

        addProjectListDOM(newTitle);
    } else {
        if (newTitle === "") {
            alert("Please enter a name for your Project List");
        } else {
            alert("Project List with this name already exists!");
        }
    }
    window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));
}

function deleteProjectList() {
    let projectListName = document.getElementById("project-list-header")
        .innerText;
    for (let p = 0; p < user1.projects.length; p++) {
        if (String(user1.projects[p].title) === projectListName) {
            console.log(p);
            user1.projects.splice(p, 1);
            break;
        }
    }
    let projectListLinkToDelete = document.getElementById(
        projectListName + "-pl"
    );
    console.log(projectListLinkToDelete.parentNode);
    projectListLinkToDelete.remove();
    // need to delete PL link
    window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));

    showAllToDos();
    //console.log(user1);
}

function addProjectListDOM(title) {
    let pL = document.getElementById("projects-list");
    let nP = document.createElement("a");
    nP.setAttribute("class", "nav-link collapsed");
    nP.innerText = title;
    nP.setAttribute("id", title + "-pl");
    pL.appendChild(nP);
    $("#project-list-modal").modal("hide");
    document.getElementById("project-form").reset();
    nP.addEventListener("click", toggleProjectListsDOM, true);
}

function toggleProjectListsDOM() {
    // need to send projects in here by project name
    clearTableDOM();
    console.log(this.innerText);
    window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));
    console.log(user1);
    let selectNewProject = user1.projects.filter(
        (p) => p.title === this.innerText
    )[0];
    //console.log(this);
    //console.log(this.innerText);
    console.log(selectNewProject);
    renameProjectListHeaderDOM(selectNewProject);
    repopulateTableDOM(selectNewProject);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clearTableDOM() {
    // clears table
    let toDoRows = document.getElementById("to-dos-table");
    removeAllChildNodes(toDoRows);
}

function renameProjectListHeaderDOM(projectList) {
    let projectHeader = document.getElementById("project-list-header");
    projectHeader.innerText = projectList.title;
}

function repopulateTableDOM(projectList) {
    document.getElementById("delete-project-list-btn").style.visibility =
        "visible";

    let table = document.getElementById("to-dos-table");
    for (let toDo of projectList.toDos) {
        let newRow = document.createElement("tr");
        if (String(toDo.priority) === String(3)) {
            newRow.style.backgroundColor = "#f78d8d";
        } else if (String(toDo.priority) === String(2)) {
            newRow.style.backgroundColor = "#f7c68d";
        } else if (String(toDo.priority) === String(1)) {
            newRow.style.backgroundColor = "#f7f38d";
        }
        if (toDo.complete) {
            newRow.style.backgroundColor = "#c6f78d";
        }

        newRow.setAttribute("class", "odd");
        newRow.dataset.id = toDo.id;
        newRow.setAttribute("role", "row");

        let tCell1 = document.createElement("td");
        tCell1.setAttribute("colspan", "1");
        let checkBox = document.createElement("form");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        if (toDo.complete || toDo.complete === "true") {
            console.log(toDo.complete);
            input.checked = true;
        } else {
            console.log(toDo.complete);
            input.checked = false;
        }

        input.style.cursor = "pointer";
        input.addEventListener("click", toggleComplete, true);

        checkBox.appendChild(input);
        tCell1.append(checkBox);

        let tCell2 = document.createElement("td");
        tCell2.setAttribute("colspan", "8");
        tCell2.textContent = toDo["title"];

        let tCell3 = document.createElement("td");
        tCell3.setAttribute("colspan", "2");
        tCell3.textContent = toDo["dueDate"];

        if (toDo.complete) {
            tCell2.style.textDecoration = "line-through";
            tCell3.style.textDecoration = "line-through";
        }

        let tCell4 = document.createElement("td");
        tCell4.setAttribute("colspan", "1");
        let edit = document.createElement("i");
        edit.setAttribute("class", "fas fa-edit");
        edit.id = "edit-" + String(toDo.id);
        edit.dataset.toggle = "modal";
        edit.dataset.target = "#to-do-edit-modal";
        edit.style.cursor = "pointer";

        let trash = document.createElement("i");
        trash.setAttribute("class", "fas fa-trash-alt");
        trash.style.cursor = "pointer";
        trash.addEventListener("click", deleteToDo, true);
        tCell4.appendChild(edit);
        tCell4.appendChild(trash);

        newRow.appendChild(tCell1);
        newRow.appendChild(tCell2);
        newRow.appendChild(tCell3);
        newRow.appendChild(tCell4);

        table.append(newRow);
    }
}

// Need some way to link the todo to the project list...
function showAllToDos() {
    let projectHeader = document.getElementById("project-list-header");
    projectHeader.innerText = "All ToDos";

    /*   // hide delete project list button
          let deleteProjectListButton = document.getElementById("delete-project-list-btn");
          console.log(deleteProjectListButton);

          deleteProjectListButton.setAttribute('display', 'none'); */

    document.getElementById("delete-project-list-btn").style.visibility =
        "hidden";

    console.log("need to refresh the table to show all todos ordered by id");
    window.localStorage.setItem("user", JSON.stringify(user1));
    user1 = JSON.parse(window.localStorage.getItem("user"));
    let allToDos = [];
    for (let project of user1.projects) {
        console.log(project);
        allToDos = allToDos.concat(project.toDos);
    }
    console.log(allToDos);
    clearTableDOM();
    let table = document.getElementById("to-dos-table");
    for (let toDo of allToDos) {
        let newRow = document.createElement("tr");
        if (String(toDo.priority) === String(3)) {
            newRow.style.backgroundColor = "#f78d8d";
        } else if (String(toDo.priority) === String(2)) {
            newRow.style.backgroundColor = "#f7c68d";
        } else if (String(toDo.priority) === String(1)) {
            newRow.style.backgroundColor = "#f7f38d";
        }
        if (toDo.complete) {
            newRow.style.backgroundColor = "#c6f78d";
        }

        newRow.setAttribute("class", "odd");
        newRow.dataset.id = toDo.id;
        newRow.setAttribute("role", "row");

        let tCell1 = document.createElement("td");
        tCell1.setAttribute("colspan", "1");
        let checkBox = document.createElement("form");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");

        if (toDo.complete || toDo.complete === true) {
            console.log(toDo.complete);
            input.checked = true;
            console.log(input.checked);
            console.log(checkBox);
        } else {
            console.log(toDo.complete);
            input.checked = false;
            console.log(input.checked);
            console.log(checkBox);
        }

        input.style.cursor = "pointer";
        input.addEventListener("click", toggleComplete, true);

        checkBox.appendChild(input);
        tCell1.append(checkBox);

        let tCell2 = document.createElement("td");
        tCell2.setAttribute("colspan", "8");
        tCell2.textContent = toDo["title"];

        let tCell3 = document.createElement("td");
        tCell3.setAttribute("colspan", "2");
        tCell3.textContent = toDo["dueDate"];

        if (toDo.complete) {
            tCell2.style.textDecoration = "line-through";
            tCell3.style.textDecoration = "line-through";
        }

        let tCell4 = document.createElement("td");
        tCell4.setAttribute("colspan", "1");
        let edit = document.createElement("i");
        edit.setAttribute("class", "fas fa-edit");
        edit.id = "edit-" + String(toDo.id);
        edit.dataset.toggle = "modal";
        edit.dataset.target = "#to-do-edit-modal";
        edit.style.cursor = "pointer";

        let trash = document.createElement("i");
        trash.setAttribute("class", "fas fa-trash-alt");
        trash.style.cursor = "pointer";
        trash.addEventListener("click", deleteToDo, true);
        tCell4.appendChild(edit);
        tCell4.appendChild(trash);

        newRow.appendChild(tCell1);
        newRow.appendChild(tCell2);
        newRow.appendChild(tCell3);
        newRow.appendChild(tCell4);

        table.append(newRow);
    }
}

// Edit Modal Shenanigans
$(function () {
    //Take the data from the TR during the event button
    let editToDo;

    $("table").on("click", ".fas.fa-edit", function (ele) {
        let tr = ele.target.parentNode.parentNode;
        let projectListName = document.getElementById("project-list-header")
            .innerText;
        let currentProject;
        console.log(projectListName);
        console.log(tr.dataset.id);
        let showAllToDosFlag = false;

        // it might not necessarily be all todos as the current project... have to check where the editToDos
        if (projectListName === "All ToDos") {
            showAllToDosFlag = true;
            let editID = tr.dataset.id;
            console.log(editID);
            for (let p of user1.projects) {
                for (let t of p.toDos) {
                    if (String(t.id) === String(editID)) {
                        currentProject = p;
                    }
                }
            }
        } else {
            currentProject = user1.projects.filter(
                (p) => p.title === projectListName
            )[0];
        }

        //console.log('hello this worked');
        console.log(currentProject);
        let title = tr.cells[1].textContent;
        let dueDate = tr.cells[2].textContent;
        //console.log(title, dueDate);
        editToDo = currentProject.toDos.filter(
            (t) => String(t.id) === tr.getAttribute("data-id")
        )[0];
        console.table(editToDo);
        let description = editToDo.desc;
        let priority = editToDo.priority;

        $("#new-to-do-edit").val(title);
        $("#new-due-date-edit").val(dueDate);
        $("#new-desc-edit").val(description);
        $("#new-priority-edit").val(priority);

        let editSaveButton = document.getElementById("edit-save-btn");
        /* editSaveButton.addEventListener("click",
                    function () {
                        console.log(title);
                        //let projectListName = document.getElementById("project-list-header").innerText;
                        editToDo.title = document.getElementById("new-to-do-edit").value;
                        editToDo.desc = document.getElementById("new-desc-edit").value;
                        editToDo.dueDate = document.getElementById("new-due-date-edit").value;
                        editToDo.priority = document.getElementById("new-priority-edit").value;
                        console.log(editToDo);
                        console.log(currentProject);
                        clearTableDOM();
                        repopulateTableDOM(currentProject);
                        $('#to-do-edit-modal').modal('hide');
                    }); */
        $(editSaveButton)
            .off()
            .on("click", function () {
                console.log(title);
                //let projectListName = document.getElementById("project-list-header").innerText;
                editToDo.title = document.getElementById("new-to-do-edit").value;
                editToDo.desc = document.getElementById("new-desc-edit").value;
                editToDo.dueDate = document.getElementById("new-due-date-edit").value;
                editToDo.priority = document.getElementById("new-priority-edit").value;
                console.log(editToDo);
                console.log(currentProject);
                clearTableDOM();
                window.localStorage.setItem("user", JSON.stringify(user1));
                user1 = JSON.parse(window.localStorage.getItem("user"));
                if (!showAllToDosFlag) {
                    repopulateTableDOM(currentProject);
                } else {
                    showAllToDos();
                }
                $("#to-do-edit-modal").modal("hide");
            });
    });
});