import { getAllBooks } from "./service.js";

const authorList = document.getElementById("authorList");

async function getData() {
  const books = await getAllBooks();

  let authors = [];

  // Müəllif adlarını çıxardırıq
  books.forEach(function (book) {
    let parts = book.author.split(","); // bir neçə müəllif varsa
    parts.forEach(function (name) {
      let trimmed = name.trim();
      if (!authors.includes(trimmed)) {
        authors.push(trimmed);
      }
    });
  });

  // Əlifba sırası ilə düzürük
  authors.sort();

  // Baş hərflərə görə qruplaşdırırıq
  let grouped = {};

  authors.forEach(function (author) {
    let firstLetter = author[0].toUpperCase();

    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }

    grouped[firstLetter].push(author);
  });

  // Baş hərfləri (A, B, C...) sort edirik
  const sortedLetters = Object.keys(grouped).sort();

  // HTML-ə əlavə edirik
  sortedLetters.forEach(function (letter) {
    let box = document.createElement("div");
    box.className = "bg-white rounded-xl shadow p-4";

    let title = document.createElement("h2");
    title.textContent = letter;
    title.className = "text-2xl  text- mb-2";
    box.appendChild(title);

    // Qrupdakı müəllifləri sort edirik (əgər yuxarıda sort olunmayıbsa)
    grouped[letter].sort();

    grouped[letter].forEach(function (author) {
      let p = document.createElement("p");
      p.textContent = author;
      p.className = "ml-2 text-red-400 text-lg capitalize";
      box.appendChild(p);
    });

    authorList.appendChild(box);
  });
}

getData();