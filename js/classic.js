import { getAllBooks, getAllCategs } from "./service.js";
const filterlenenKitablar = document.getElementById("filterlenenKitablar");
let books = [];
async function getData() {
  books = await getAllBooks();
  const categories = await getAllCategs();

  // "kitab" adlı kateqoriyanı tap
  const kitabCategory = categories.find((cat) => cat.category === "Kitablar");

  if (kitabCategory && kitabCategory.subcategories) {
    printClassicategs(kitabCategory.subcategories);
  } else {
    console.error("Kitablar kateqoriyası tapılmadı.");
  }
  printFilterBook();
}

getData();
function printFilterBook() {
  filterlenenKitablar.innerHTML = ``;
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Kitabları sales dəyərinə görə çoxdan aza sırala

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

    filterlenenKitablar.appendChild(card);
  });
}

function printClassicategs(subcategory) {
  classicCategory.innerHTML = ``;

  subcategory.forEach((item) => {
    classicCategory.innerHTML += `
      <li onclick="filterKateg('${item.name}')" class="hover:bg-slate-200 hover:text-red-500 cursor-pointer py-[5px] px-[5px] transition-all text-[#0f172abf] text-[13px]">
        ${item.name}
      </li>
    `;
  });
}

window.FilterLang=(lang)=> {
  filterlenenKitablar.innerHTML = ``;
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const filteredBooks = books
    .filter((book) => book.lang.includes(lang)) 
    .sort((a, b) => b.sales - a.sales); 

  filteredBooks.forEach((book) => {
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

    filterlenenKitablar.appendChild(card);
  });
}