// display.js
/* 

All of the DOM-related functionality of this project 

*/

// add in a new project list
export function addProjectListDOM(title) {
    pL = document.getElementById('projects-list')
    let nP = document.createElement("a");
    nP.setAttribute("class", "nav-link collapsed");
    nP.innerText = title;
    pL.appendChild(nP);
}