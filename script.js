const addButton = document.getElementById("add-button");
const closeButton = document.getElementById("close-button");
const formDialog = document.getElementById("form-dialog");
const titleField = document.getElementById("title-field");
const authorField = document.getElementById("author-field");
const pagesField = document.getElementById("pages-field");
const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");

const myLibrary = [];

window.addEventListener("load", () => {
    loadBooks();
});

addButton.addEventListener("click", () => {
    formDialog.showModal();
})

closeButton.addEventListener("click", () => {
    formDialog.close();
})

function handleStatusClick(e) {
    let bookId = e.target.attributes["data-id"].value;
    let isReadCurrent = myLibrary[bookId].isRead;

    if (isReadCurrent === true) {
        myLibrary[bookId].isRead = false;
    } if (isReadCurrent === false) {
        myLibrary[bookId].isRead = true;
    }

    loadBooks();
};

function handleRemoveClick(e) {
    if (confirm("Do you want to remove this book?")) {
        let bookId = e.target.attributes["data-id"].value;
        myLibrary.splice(bookId, 1);
        loadBooks();
    }
}

function loadBooks() {
    tableBody.replaceChildren();

    myLibrary.forEach((book, index) => {
        let newRow = document.createElement("tr");
        let tdTitle = document.createElement("td");
        let tdAuthor = document.createElement("td");
        let tdPages = document.createElement("td");
        let tdStatus = document.createElement("td");
        let tdRemove = document.createElement("td");
        let btnStatus = document.createElement("button");
        let btnRemove = document.createElement("button");
        let btnClass = book.isRead === false ? "btn-unread" : "btn-finished";

        tdTitle.classList.add("td-title");
        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = `${book.pages} pages`;

        btnStatus.classList.add("btn-status");
        btnStatus.classList.add(btnClass);
        btnStatus.textContent = book.isRead === false ? "Unread" : "Finished";
        btnStatus.dataset.id = index;

        btnRemove.classList.add("btn-remove");
        btnRemove.textContent = "Remove";
        btnRemove.dataset.id = index;

        tdRemove.appendChild(btnRemove);
        tdRemove.classList.add("td-remove");
        tdStatus.appendChild(btnStatus);
        tdStatus.classList.add("td-status");
        btnStatus.addEventListener("click", handleStatusClick);
        btnRemove.addEventListener("click", handleRemoveClick);

        newRow.appendChild(tdTitle);
        newRow.appendChild(tdAuthor);
        newRow.appendChild(tdPages);
        newRow.appendChild(tdStatus);
        newRow.appendChild(tdRemove);
        tableBody.prepend(newRow);
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    formDialog.close();
    form.reset();
    loadBooks();
})

function addBookToLibrary() {
    let title = titleField.value;
    let author = authorField.value;
    let pages = pagesField.value;
    const statusRadio = document.querySelector("input[name='status']:checked");
    let status = statusRadio.value;
    let isRead = status === "unread" ? false : true;

    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead === false ? "not read yet" : "finished"}`;
    };
}