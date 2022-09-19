// DOM Address to run handel events
const form = document.querySelector('.form');
const title = document.querySelector('.book-title');
const author = document.querySelector('.book-author');
const listContainer = document.querySelector('.books-list');
let books = [];


// Object Constructor function
function Book(title, author) {
  this.title;
  this.author;
}


// a function to create items template
function createBook({ title, author }) {
  return `
        <li class="list-item">
            <span>${title}</span>
            <span>${author}</span>
            <button class="remove-button">Remove</button>
        </li>`;
}

// Check for available data at local storage and displaying them
function checkStorage() {
  const storage = localStorage.getItem('books');
  if (storage) {
    books = JSON.parse(storage);
    books.forEach((item) => {
      listContainer.innerHTML += createBook(item);
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

// Load the data in the local storage
window.addEventListener('load', () => {
  checkStorage();
});

// on the form submit new item will be generated
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const item = new Book(bookTitle, bookAuthor);
  books.push(item);
  localStorage.setItem('books', JSON.stringify(books));
  listContainer.innerHTML = '';
  checkStorage();
});
