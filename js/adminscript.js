import {
  createBook,
  deleteBookById,
  getAllBooks,
  updateBook,
} from "./service.js";

let books = [];
const bookTableBody = document.getElementById("bookTableBody");
async function getData() {
  books = await getAllBooks();
  printBooks();
}
getData();

function printBooks() {
  bookTableBody.innerHTML = ``;

  books.forEach((book) => {
    bookTableBody.innerHTML += `
            <td>${book.id}</td>
            <td><img src="${book.img}" alt="${book.name}"></td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td>${book.category}</td>
            <td>${book.altCateg}</td>
            <td>${book.lang}</td>
            <td>${book.sales}</td>
            <td>${book.view}</td>
            <td>

  <i data-bs-toggle="modal" data-bs-target="#updateBookModal" onclick="UpdateFunc('${book.id}')" class="cursor-pointer text-xl fa-solid fa-pen" style="color: #00a83b;"></i>
          
  <i onclick="handleDelete('${book.id}')" class="cursor-pointer text-xl fa-solid fa-trash" style="color: #8d1702;"></i>
            </td>
            `;
  });
}

window.handleDelete = async (id) => {
  // SweetAlert2 ilə təsdiq pəncərəsini göstəririk
  const result = await Swal.fire({
    title: "Əminsən?",
    text: "Bunu geri qaytara bilməyəcəksiniz!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Ləğv et",
    confirmButtonText: "Sil !",
  });

  if (result.isConfirmed) {
    // Kitabın ID-si ilə silinməsi
    await deleteBookById(id);

    // Kitabı `books` array-dən silirik
    books = books.filter((item) => item.id != id);

    // Kitabları yenidən çap edirik
    printBooks();

    // Silindiyini bildirmək üçün xəbərdarlıq göstəririk
    Swal.fire({
      title: "Silindi!",
      text: "Faylınız silindi.",
      icon: "success",
    });
  }
};

function getVal() {
  return {
    name: document.getElementById("bookName").value,
    author: document.getElementById("bookAuthor").value,
    img: document.getElementById("bookImg").value,
    price: Number(document.getElementById("bookPrice").value),
    desc: document.getElementById("bookDesc").value,
    category: document.getElementById("bookCategory").value,
    altCateg: document
      .getElementById("bookAltCategory")
      .value.split(",")
      .map((s) => s.trim()),
    lang: document
      .getElementById("bookLang")
      .value.split(",")
      .map((s) => s.trim()),
    isBought: false,
    sales: 0,
    view: 0,
  };
}

window.handlePost = async () => {
  const newObj = getVal();
  const resBooks = await createBook(newObj);
  if (resBooks) {
    books.push(resBooks);
  }
  printBooks();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: "Uğurla əlavə olundu",
  });

  document.getElementById("bookName").value=''
    document.getElementById("bookAuthor").value=''
    document.getElementById("bookImg").value=''
  document.getElementById("bookPrice").value=''
    document.getElementById("bookDesc").value=''
    document.getElementById("bookCategory").value=''
    document.getElementById("bookAltCategory").value=''
    document.getElementById("bookLang").value=''

};

window.UpdateFunc = (id) => {
  console.log(id);
  console.log(books);

  let book = books.find((item) => id == item.id);
  document.getElementById("updateBookName").value = book.name;
  document.getElementById("updateBookAuthor").value = book.author;
  document.getElementById("updateBookImg").value = book.img;
  document.getElementById("updateBookPrice").value = book.price;
  document.getElementById("updateBookDesc").value = book.desc;
  document.getElementById("updateBookCategory").value = book.category;
  document.getElementById("updateBookAltCategory").value = book.altCateg;
  document.getElementById("updateBookLang").value = book.lang;
 

  window.handleEdit = async () => {
    const editObj = getVal2(book);
    console.log(editObj);
    await updateBook(editObj, id);
    data = await getAllBooks();
    printBooks();
  };
};

function getVal2(prevBook) {
  return {
    name: document.getElementById("updateBookName").value,
    author: document.getElementById("updateBookAuthor").value,
    img: document.getElementById("updateBookImg").value,
    price: Number(document.getElementById("updateBookPrice").value),
    desc: document.getElementById("updateBookDesc").value,
    category: document.getElementById("updateBookCategory").value,
    altCateg: document
      .getElementById("updateBookAltCategory")
      .value.split(",")
      .map((s) => s.trim()),
    lang: document
      .getElementById("updateBookLang")
      .value.split(",")
      .map((s) => s.trim()),
    isBought: prevBook.isBought,
    sales: prevBook.sales,
    view: prevBook.view,
  };
}

