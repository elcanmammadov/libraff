let cart = JSON.parse(localStorage.getItem("cart")) || {};
const cartMenu = document.getElementById("cartMenu");

// Səbəti yadda saxla
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Məhsulu səbətə əlavə et
window.addToCart = (id, name, price, img) => {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { name, price, qty: 1, img };
  }
  saveCart();
  renderCart();
};

// Miqdarı dəyiş
window.updateQty = (id, change) => {
  if (!cart[id]) return;
  cart[id].qty += change;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  renderCart();
};

// Səbəti göstər
window.renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const emptyMsg = document.getElementById("empty-cart-msg");

  cartItems.innerHTML = "";
  let total = 0;

  const entries = Object.entries(cart);
  if (entries.length === 0) {
    emptyMsg.style.display = "block";
    cartTotal.textContent = "0";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  entries.forEach(([id, item]) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center mb-2";
    li.innerHTML = `
        <div class="flex items-center space-x-3 w-full">
          <img src="${item.img}" class="w-12 h-16 object-cover rounded" alt="${item.name}" />
          <div class="flex-1 items-start">
            <p class="font-semibold text-left">${item.name}</p>
            <p class="text-sm text-gray-500">${item.qty} x ${item.price} AZN</p>
          </div>
          <div class="flex items-center gap-[10px] space-x-1">
            <button onclick="updateQty(${id}, -1)" class="px-2 py-1 text-xl font-bold text-black rounded  hover:bg-red-600 transition">-</button>
            <button onclick="updateQty(${id}, 1)" class="px-2 py-1 text-xl font-bod text-black rounded  hover:bg-green-600 transition">+</button>
          </div>
        </div>
      `;
    cartItems.appendChild(li);
    total += item.qty * item.price;
  });

  cartTotal.textContent = total.toFixed(2);
};

// Səhifə yüklənəndə səbəti göstər
window.addEventListener("DOMContentLoaded", renderCart);
