// DOM Address to run handel events
const form = document.querySelector('form');
const title = document.getElementById('bookTitle');
const author = document.getElementById('bookAuthor');
const listContainer = document.querySelector('.booksList');
let books = [];

// Object Constructor functio

class Book {
  constructor(title, bookAuthor) {
    this.title = title;
    this.author = author;
  }

  // a function to create items template
  createElem({ title, author }) {
    return `
        <div class="list-item">
            <span>${title}</span>
            <span>${author}</span>
            <button class="remove-button">Remove</button>
        </div>`;
  }

  // Check for available data at local storage and displaying the
  checkStorage() {
    const storage = localStorage.getItem('books');
    if (storage) {
      books = JSON.parse(storage);
      books.forEach((item) => {
        listContainer.innerHTML += Book.createElem(item);
      });
      const removeBtn = document.querySelectorAll('.remove-button');
      removeBtn.forEach((e, i) => {
        e.addEventListener('click', () => {
          e.parentNode.remove();
          books.splice(i, 1);
          localStorage.setItem('books', JSON.stringify(books));
        });
      });
    }
  }
}

// Load the data in the local storag

window.addEventListener('load', () => {
    Book.checkStorage();
  });

// on the form submit new item will be generated
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookTitle = Book.title.value;
    const bookAuthor = Book.author.value;
    const item = new Book(bookTitle, bookAuthor);
    books.push(item);
    localStorage.setItem('books', JSON.stringify(books));
    listContainer.innerHTML = '';
    Book.checkStorage();
  });
