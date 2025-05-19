async function getAllBooks() {
  try {
    const res = await fetch("https://libraffdata.onrender.com/kitablar");
    if (!res.ok) {
      throw new Error(`${res.status} fetchdə xəta baş verdi`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
async function getAllCategs() {
  try {
    const res = await fetch("../data/catalogData.json");
    if (!res.ok) {
      throw new Error(`${res.status} fetchdə xəta baş verdi`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
async function getAllSliders() {
  try {
    const res = await fetch("https://libraffdata.onrender.com/slides");
    if (!res.ok) {
      throw new Error(`${res.status} fetchdə xəta baş verdi`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
async function deleteBookById(id) {
  try {
    const res = await fetch(`https://libraffdata.onrender.com/kitablar/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status} fetchdə xəta baş verib`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
async function createBook(bookData) {
  try {
    const res = await fetch("https://libraffdata.onrender.com/kitablar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!res.ok) {
      throw new Error(`${res.status} fetchdə xəta baş verib`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
async function updateBook(bookData,id) {
  try {
    const res = await fetch(
      `https://libraffdata.onrender.com/kitablar/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      }
    );

    if (!res.ok) {
      throw new Error(`${res.status} fetchdə xəta baş verib`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export { deleteBookById, getAllBooks, createBook, updateBook,getAllSliders,getAllCategs };
