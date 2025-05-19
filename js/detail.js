import { getAllBooks, updateBook } from "./service.js";

const detCard = document.querySelector("#detCard");
const params = location.search;
const id = new URLSearchParams(params).get("id");

let books = [];
let book;
async function getData() {
  books = await getAllBooks();
  book = books.find((item) => item.id == id);

  printCard();
  printbooks();
}
getData();

function printCard() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.some((item) => item.id == book.id);
  console.log(isFavorite);

  detCard.innerHTML = ` <div class="w-[95vw] mx-auto">
        <p class="container text-[16px] pb-[20px] font-[Nunoti] text-[#9c9c9c]">
          <a href="index.htm" class="hover:text-red-400">Əsas səhifə</a> /
          <a href="" class="hover:text-red-400">Kitab</a> /
          <a href="" class="hover:text-red-400">${book.category}</a> /
          <a href="" class="hover:text-red-400">${book.author}</a>
        </p>

        <div
          class="w-full mx-auto text-gray-900 rounded-lg flex flex-col lg:flex-row xl:flex-row md:flex-row gap-8"
        >
          <!-- Sol tərəf - Kitab şəkli -->
          <div class="w-[50%]">
            <img
              src="${book.img}"
              alt=""
              class="rounded-lg object-cover mx-auto"
            />
          </div>

          <!-- Sağ tərəf - Məlumatlar -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <p class="text-sm text-gray-400">Kod: 978995281900${book.id}</p>
              <h1 class="text-[40px] font-semibold mt-2">
                ${book.name}
              </h1>
              <p
                class="text-lg text-gray-400 hover:text-gray-800 cursor-pointer"
              >
                ${book.author}
              </p>

              <!-- Qiymət -->
              <div class="my-6 items-center gap-4">
                <p class="text-2xl font-bold">${book.price} ₼</p>
                <div class="flex gap-[10px]">
                  <p class="line-through text-gray-500">${(
                    book.price * 1.25
                  ).toFixed(2)} ₼</p>
                  <span
                    class="bg-red-600 text-white rounded px-1 py-0.5 text-sm"
                    >-20%</span
                  >
                </div>
              </div>

              <!-- Səbət düyməsi -->
              <button 
              onclick="addToCart(${book.id}, '${book.name}',  ${book.price},'${
    book.img
  }')" 
                class="mt-6 bg-red-700 w-[90%] mx-auto hover:bg-red-800 transition rounded-3xl py-3 px-6 text-white font-semibold"
              >
                Səbətə əlavə et
              </button>

              <div
                class="w-[90%] text-gray-400 flex items-center justify-between px-6 py-4 text-sm"
              >
                <!-- Seçilmiş -->
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-red-600 transition"
                >
                <i id="heart-${book.id}"  class="fa-regular text-2xl fa-heart ${
    isFavorite ? "text-red" : "text-gray-400"
  }" onclick="likeBtn(${book.id})"></i>
                  <span>Seçilmiş</span>
                </div>

                <!-- Kömək -->
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-red-600 transition"
                >
                  <i class="fa-regular fa-comment text-xl"></i>
                  <span>Sizə necə kömək edə bilərik?</span>
                </div>
              </div>
            </div>

            <!-- Çatdırılma və digər məlumatlar -->
            <div class="my-4 text-gray-900 text-[16px]">
              <p><strong>Çatdırılma haqqında</strong></p>
              <p>Bakı şəhəri üçün təxminî müddət və qiymətlər.</p>
              <p>
                <i class="fa-solid fa-shop mr-[2px]"></i>Mağazadan təhvil alma —
                <span class="font-semibold">pulsuz</span>.
              </p>
              <p>
                <i class="fa-solid fa-motorcycle mr-[2px]"></i>Kuryer ilə —
                operator təsdiqindən sonra
                <span class="font-semibold">24 saat ərzində</span>. 30 AZN və
                yuxarı sifarişlərdə — <span class="font-semibold">pulsuz</span>.
              </p>
              <p>
                Bölgələrə çatdırılma
                <span class="font-semibold">3-5 iş günü</span>
                ərzində.
              </p>
            </div>
          </div>
        </div>
      </div>`;
}
function printbooks() {
  enCoxAxtarilanKitablar.innerHTML = ``;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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

    enCoxAxtarilanKitablar.appendChild(card);
  });
}
window.likeBtn = (id) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.some((item) => item.id == id);

  if (isFavorite) {
    favorites = favorites.filter((item) => item.id != id);
    showToast("Kitab wishlist-dən silindi", "warning");
  } else {
    const item = books.find((book) => book.id == id);
    if (item) {
      favorites.push(item);
      showToast("Kitab wishlist-ə əlavə olundu", "success");
    }
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  printbooks();
};
function showToast(message, icon = "success") {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}

window.showLanbBar = () => {
  langBar.classList.toggle("block");
  langBar.classList.toggle("hidden");
};
window.showUserBar = () => {
  userBar.classList.toggle("block");
  userBar.classList.toggle("hidden");
};
window.sebet = () => {
  cartMenu.classList.toggle("block");
  cartMenu.classList.toggle("hidden");
};

window.openCategModal = () => {
  categIcon.classList.toggle("hidden");
  categIcon.classList.toggle("flex");
  categIcon2.classList.toggle("flex");
  categIcon2.classList.toggle("hidden");
  cataloqModal.classList.toggle("flex");
  cataloqModal.classList.toggle("hidden");
};
window.completeOrder = async () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Hər kitab üçün sales += qty, updateBook'u await ilə çağır
  for (const [id, item] of Object.entries(cart)) {
    if (typeof item.sales !== "number") item.sales = 0;
    let book = books.find((b) => b.id == id);
    if (book) {
      book.sales += item.qty;
      await updateBook(book, id);
    }
  }

  // Səbəti sil (sifariş tamamlandı)
  localStorage.removeItem("cart");
  window.cart = {};

  // Səbəti yenidən göstər
  renderCart();

  alert("Sifariş qəbul olundu, satışlar yeniləndi!");
};
