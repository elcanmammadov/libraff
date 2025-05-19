const secilmiskitablar = document.getElementById("secilmiskitablar");

function printSelectedBooks() {
  const secilmiskitablar = document.getElementById("secilmiskitablar");
  secilmiskitablar.innerHTML = ""; // əvvəlki məzmunu təmizlə

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div class="card-heart" onclick="removeFromFavorites(${
          book.id
        })" style="color: red"><i class="fa-solid fa-circle-xmark" style="color: #930000;"></i></div>
        <img src="${book.img}" alt="${book.name}" />
        <div class="card-body">
          <h3 class="card-title">${book.name}</h3>
          <div class="card-author">${book.author}</div>
          <div class="card-price">${book.price.toFixed(2)} AZN</div>
        </div>
      `;

    secilmiskitablar.appendChild(card);
  });
}

printSelectedBooks();

function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((item) => item.id != id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  printSelectedBooks(); // siyahını yenilə
  showToast("Kitab wishlist-dən silindi", "warning"); // Burada silinmə mesajı olmalıdır
}

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
