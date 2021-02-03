let bookId = 0;

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.status = this.read ? 'Read' : 'Not read'
    this.id = bookId++
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let harryPotter1 = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 309, false);
let eragon = new Book('Eragon', 'Christopher Paolini', 509, false);


let myLibrary // = [theHobbit, harryPotter1, eragon];
if (window.localStorage.getItem('lib')) {
    console.log('Local Storage of lib exists');
    myLibrary = JSON.parse(window.localStorage.getItem('lib'));
    console.log(myLibrary);
} else {
    console.log("Local Storage of lib don't exists");
    myLibrary = [theHobbit, harryPotter1, eragon]
    window.localStorage.setItem("lib", JSON.stringify(myLibrary));
}

console.log(myLibrary)

const library = document.querySelector('table');


function buildLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        let tr = document.createElement('tr');
        tr.classList.add("book");
        tr.id = 'book-' + String(myLibrary[i].id);
        library.appendChild(tr);
        for (let j = 0; j < 5; j++) {
            td = document.createElement('td');


            switch (j) {
                case 0:
                    td.appendChild(document.createTextNode(myLibrary[i].title));
                    tr.appendChild(td);
                    break;
                case 1:
                    td.appendChild(document.createTextNode(myLibrary[i].author));
                    tr.appendChild(td);
                    break;
                case 2:
                    td.appendChild(document.createTextNode(myLibrary[i].pages));
                    tr.appendChild(td);
                    break;
                case 3:
                    td.appendChild(document.createTextNode(myLibrary[i].status));
                    td.addEventListener("click", flipStatus);
                    td.style.cursor = "pointer";
                    tr.appendChild(td);
                    break;
                case 4:
                    let button = document.createElement("button");
                    button.innerHTML = 'X';
                    button.className = 'btn btn-outline-danger';
                    button.id = 'delete-button-' + myLibrary[i].id;
                    td.appendChild(button);
                    //console.log(button);
                    tr.appendChild(td);
                default:
                    // code block
            }
        }
    }
    /*     const books = document.querySelectorAll('.book');
        for (let i = 0; i < books.length; i++) {
            books[i].id = 'book-' + i;
        } */

    let deleteButtons = document.getElementsByClassName("btn btn-outline-danger");
}

let deleteButtons = document.getElementsByClassName("btn btn-outline-danger");


function flipStatus() {
    let id = this.parentNode.id.toString();
    id = id.substring(id.length - 1, id.length);

    for (let j = 0; j < myLibrary.length; j++) {
        if (String(myLibrary[j].id) === id) {
            myLibrary[j].read = !myLibrary[j].read;
            myLibrary[j].status = myLibrary[j].read ? 'Read' : 'Not read';
            window.localStorage.setItem("lib", JSON.stringify(myLibrary));
            updateLibraryTable(id, myLibrary[j].status);
        }
    }
}

function updateLibraryTable(id, status) { // used for flipping read status    

    let updateRow = document.getElementById('book-' + id);
    updateRow.childNodes[3].innerText = status;

}

console.log(myLibrary);

buildLibrary();


function deleteBook() {
    let bookId = this.id;
    let id = bookId.substring(bookId.length - 1, bookId.length);

    console.log(this.id)
    let deleteBookRow = document.getElementById('book-' + id); // need to dynamically update the table....
    console.log(this, this.parentNode, this.parentNode.parentNode)
    console.log(deleteBookRow);
    deleteBookRow.parentNode.removeChild(deleteBookRow);

    let newLibrary = [];

    for (let j = 0; j < myLibrary.length; j++) { // loop that builds newLibrary objectarray
        if (String(myLibrary[j].id) !== id) {
            console.log(myLibrary[j]);
            newLibrary.push(myLibrary[j])
        }
    }
    myLibrary = newLibrary;
    window.localStorage.setItem("lib", JSON.stringify(myLibrary));
    console.log(myLibrary)
}


for (i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteBook);
}

function showForm() { // toggles between hiding and showing form
    if (document.getElementById('formElement').style.display === 'block') {
        document.getElementById('formElement').style.display = 'none';
    } else {
        document.getElementById('formElement').style.display = 'block';
    }
}

function addNewBook() {
    console.log('hello?')
    let newTitle = document.getElementById("new-title").value;
    let newAuthor = document.getElementById("new-author").value;
    let newPages = document.getElementById("new-pages").value;
    let radios = document.getElementsByName('new-read');
    let haveRead;

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            console.log(radios[i].value);
            haveRead = (radios[i].value == 'true'); // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    //console.log(validateForm())


    let newBook = new Book(newTitle, newAuthor, newPages, haveRead);

    console.log(newBook);
    myLibrary.push(newBook);
    window.localStorage.setItem("lib", JSON.stringify(myLibrary));
    document.getElementById("formElement").reset();

    showForm();

    let tr = document.createElement('tr');
    tr.classList.add("book");
    tr.id = 'book-' + newBook.id;
    library.appendChild(tr);
    for (let j = 0; j < 5; j++) {
        td = document.createElement('td');
        switch (j) {
            case 0:
                td.appendChild(document.createTextNode(newBook.title));
                tr.appendChild(td);
                break;
            case 1:
                td.appendChild(document.createTextNode(newBook.author));
                tr.appendChild(td);
                break;
            case 2:
                td.appendChild(document.createTextNode(newBook.pages));
                tr.appendChild(td);
                break;
            case 3:
                td.appendChild(document.createTextNode(newBook.status));
                td.addEventListener("click", flipStatus);
                tr.appendChild(td);
                break;
            case 4:
                let button = document.createElement("button");
                button.innerHTML = 'X';
                button.className = 'btn btn-outline-danger';
                button.id = 'delete-button-' + newBook.id;
                td.appendChild(button);
                //console.log(button);
                tr.appendChild(td);
            default:
                // code block
        }
    }
    for (i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteBook);
    }
    //buildLibrary();
}



document.getElementById("formElement").addEventListener('submit', function (event) {
    event.preventDefault();
    addNewBook();
});