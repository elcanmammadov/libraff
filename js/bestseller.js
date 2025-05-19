import { getAllBooks } from "./service.js";
const encoxsatilankitablar = document.getElementById("encoxsatilankitablar");
let books = [];
async function getData() {
  books = await getAllBooks();

  printbooks();
}
getData();

function printbooks() {
  encoxsatilankitablar.innerHTML = ``;
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Kitabları sales dəyərinə görə çoxdan aza sırala
  books.sort((a, b) => b.sales - a.sales);

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    const isFavorite = favorites.some((item) => item.id == book.id);

    card.innerHTML = `
    <div id="heart-${book.id}" class="card-heart" onclick="likeBtn(${
      book.id
    })" style="color: ${isFavorite ? "red" : "white"}">&#10084;</div>
    
    <img onclick="handleView(${book.id},${book.view})" src="${
      book.img
    }" class="cursor-pointer" alt="${book.name}" />
    
    <div class="card-body">
      <h3 class="card-title">${book.name}</h3>
      <div class="card-author">${book.author}</div>
      <div class="card-price">${book.price} AZN</div>
    </div>
  `;

    encoxsatilankitablar.appendChild(card);
  });
}