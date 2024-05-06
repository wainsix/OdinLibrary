const myLibrary = [];

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;

  console.log(this.title, this.author, this.year);
}

function addBookToLibrary() {
  // do stuff here
}

Book("Lord of the rings", "JRR Tolkien", "1954");
