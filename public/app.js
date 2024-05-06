const myLibrary = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, true), // Esimerkki luettu kirja
  new Book("To Kill a Mockingbird", "Harper Lee", 1960, false), // Esimerkki lukematon kirja
];

function Book(title, author, year, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = read;
}

function addBookToLibrary(event) {
  event.preventDefault(); // Estä lomakkeen oletustoiminto (sivun uudelleenlataus)

  // Hae lomakkeen arvot
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const read = document.getElementById("read").checked;

  // Luodaan uusi kirja-olio ja lisätään se kirjastoon
  const newBook = new Book(title, author, year, read);
  myLibrary.push(newBook);

  // Tyhjennä lomake
  document.getElementById("bookForm").reset();

  console.log("Kirja lisätty:", newBook);
}

// Etsi lomake ja liitä siihen tapahtumankäsittelijä
const form = document.getElementById("bookForm");
form.addEventListener("submit", addBookToLibrary);

// Funktio kirjojen näyttämiseksi taulukossa
function showBooks() {
  const tableBody = document.querySelector("#bookList table");
  // Tyhjennä taulukko ensin
  tableBody.innerHTML =
    "<tr>  <td>title</td>  <td>author</td>  <td>year</td><td>read</td></tr>";

  // Käy läpi kirjasto ja lisää jokainen kirja taulukkoon
  myLibrary.forEach((book, index) => {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const yearCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const actionCell = row.insertCell(4);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    yearCell.textContent = book.year;
    readCell.textContent = book.read ? "read" : "unread";

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = book.read ? "Unread" : "Read";
    toggleReadButton.addEventListener("click", () => {
      myLibrary[index].read = !myLibrary[index].read; // Vaihda lukutilaa
      showBooks(); // Päivitä näkymä
    });
    actionCell.appendChild(toggleReadButton); // Lisää nappi soluun

    // Luo delete-nappi ja liitä siihen tapahtumankäsittelijä, joka poistaa kyseisen kirjan
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1); // Poista kirja taulukosta
      showBooks(); // Päivitä näkymä
    });
    actionCell.appendChild(deleteButton); // Lisää poistonappi soluun
  });
}

// Etsi lomake ja liitä siihen tapahtumankäsittelijä
const showLibForm = document.getElementById("showLibForm");
showLibForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Estä lomakkeen oletustoiminto

  showBooks(); // Kutsu funktiota kirjojen näyttämiseksi
});
