const tableBody = document.querySelector("table tbody");

const searchBox = document.querySelector("#searchquery");

document.addEventListener("DOMContentLoaded", function () {
  fetch("./src/php/authenticat.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.authorized) {
        fetchBookData();
       } else {
        window.location.href = "./Login.html";
      }
    })
    .catch((error) => alert(error));

});

function fetchBookData() {
  fetch("./src/php/books_data.php")
    .then((response) => response.json())
    .then((data) => {
      tableBody.innerHTML = "";
      const books = data.result.bookInfo;
      books.forEach((v) => {
        tableBody.appendChild(getTableRow(v));
      });

      searchBox.addEventListener("input", (e) => {
        tableBody.innerHTML = "";

        books.filter(v => v.book_title.includes(searchBox.value)).forEach((v) => {
          tableBody.appendChild(getTableRow(v));
        });
      })
    })
    .catch((error) => alert(error));
}





const getTableRow = (
  { id_book,
    book_id,
    book_image,
    book_title,
    book_category,
    book_author,
    book_description,
    book_price,
    ISBN }
) => {
  const trow = document.createElement("tr");

  trow.innerHTML += `
          <td>${book_id}</td>
          <td>${book_image}</td>
          <td>${book_title}</td>
          <td>${book_category}</td>
          <td>${book_author}</td>
          <td><span><p id="description" class="m-0 text-start">${book_description}</p> </span></td>
          <td>$<span class="price">${book_price}</span></td>
            <td class="d-flex flex-column align-items-center justify-content-center">
              <i class="bi bi-trash d-block fs-1"></i>
              <i class="bi bi-pen d-block fs-1"></i>
             </td>
         </tr>`;

  trow.querySelector(".bi-trash").addEventListener("click", (e) => {
    fetch(`./src/php/delete_book.php?id=${id_book}`)
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        trow.remove();
      })
      .catch(error => alert(error))
  })
  trow.querySelector(".bi-pen").addEventListener("click", (e) => {
    editeBook(id_book,
      book_id,
      book_image,
      book_title,
      book_category,
      book_author,
      book_description,
      book_price,
      ISBN)
  });

  return trow;
};

const form = document.querySelector("#updateBook");


function editeBook(id_book,
  book_id,
  book_image,
  book_title,
  book_category,
  book_author,
  book_description,
  book_price,
  ISBN) {

  form.elements["bookAuthor"].value = book_author;
  form.elements["bookcategory"].value = book_category;
  form.elements["bookimage"].value = null;
  form.elements["bookprice"].value = book_price;
  form.elements["bookIsbn"].value = ISBN;
  form.elements["bookdescription"].value = book_description;
  form.elements["bookname"].value = book_title;

  $('#updateBookModal').modal('show')

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(form);

    formData.append("bookid", id_book)

    fetch('./src/php/update_book_info.php', {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        fetchBookData();
        $('#updateBookModal').modal('hide')
      })
      .catch(error => alert(error))
    $('#updateBookModal').modal('show')
  })
}
$('#updateBookModal').modal({ keyboard: false })