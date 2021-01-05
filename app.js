const books = document.querySelector("#book-library");
const addbookButton = document.querySelector("#addBook1");
const popupform = document.querySelector(".popup");
const bookform = document.querySelector("#book-form");
const bookname = document.querySelector("#bookname");
const authorname = document.querySelector("#bookauthor");
const bookurl = document.querySelector("#url");
const addbutton2 = document.querySelector("#button");
const closeformbutton = document.querySelector("#close-form");

eventListeners();
class AddBook {
    constructor(name, author, url) {
        this.name = name;
        this.author = author;
        this.url = url;
    }
}

function eventListeners() {
    addbookButton.addEventListener("click", openForm);
    bookform.addEventListener("submit", addbook);
    closeformbutton.addEventListener("click", closeForm);
    window.addEventListener("DOMContentLoaded", loadAllBook);
    books.addEventListener("click", removeBook);
}

function openForm(e) {
    popupform.style.display = "flex";

    // let name=bookname.value;
    // let author=authorname.value;
    // let url=bookurl.value;
    // let book= new AddBook(name,author,url);

    // ///kitapları ekrana ekle
}

function closeForm(e) {
    if (e.target.id == "close-form") {
        popupform.style.display = "none";
    }
    e.preventDefault();
    e.stopPropagation();
}

function addbook(e) {
    console.log(e.target);
    let name = bookname.value;
    let author = authorname.value;
    let url = bookurl.value;
    let newBook = new AddBook(name, author, url);

    if (name == "" || author == "" || url == "") {
        ///uyarı mesjı
    } else {
        AddbookToUI(newBook);
        Storage.addBooksToStorage(newBook);
    }

    bookname.value = "";
    authorname.value = "";
    bookurl.value = "";
    ///kitapları ekrana ekle
    e.preventDefault();
}

function AddbookToUI(book) {
    books.innerHTML += `<div class="col-lg-3  d-flex justify-content-center">
    <div class="card" style="width: 18rem;">
        <img src="${book.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.name}</h5>
          <p class="card-text">${book.author}</p>
          <a id="remove-button" href="#" class="btn btn-danger">Remove</a>
        </div>
      </div>
    </div>`;
}

function loadAllBook() {
    let books = Storage.getBooksFromStorage();
    books.forEach((book) => {
        AddbookToUI(book);
    });
}

function removeBook(e) {
    let element = e.target.parentElement;
    let books = Storage.getBooksFromStorage();
    

    if (e.target.id == "remove-button") {
        removeFromUI(element.parentElement.parentElement);
        books.forEach((book, index) => {
            if (element.firstElementChild.textContent == book.name) {
                books.splice(index, 1);
                localStorage.setItem("books", JSON.stringify(books));
            }
        });
    }
}

function removeFromUI(book) {
    book.remove();
}
