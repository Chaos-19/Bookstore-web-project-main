const container = document.querySelector("#viewall");
document.addEventListener("DOMContentLoaded", (e) => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const pageLink = document.querySelector("#page-link");
  pageLink.textContent = category;
  pageLink.href = "./viewable.html?category=" + category;
  const url = `./src/php/get_book_by_category.php?q=${category}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.result.bookInfo.forEach((value, index) => {
        container.appendChild(getBookCard(value));
      });
    })
    .catch((error) => alert(error));
});
function getBookCard({
  id_book,
  book_image,
  book_title,
  book_author,
  book_price,
}) {
  const bookCardCol = document.createElement("div");
  bookCardCol.classList.add("col");
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");
  bookCard.classList.add("shadow");
  bookCard.classList.add("my-4");
  bookCard.classList.add("book-card");
  bookCard.id = "book-card";
  bookCard.innerHTML += `
   <div class="position-relative">
      <div class="overlay rounded-top">
        <div class="social-media">
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        </div>
      </div>
    ${book_image}
    </div>
    <div class="card-body d-flex flex-column pb-">
      <h5 class="card-text">${book_title}</h5>
      <p class="card-text">${book_author}</p>
      <p class="card-text mb-md-3">$<span class="text-dang" id="bookPrice">${book_price}</span> <del class="text-muted"></del></p>
        <div class="flex-shrik-0 mt-auto">
      <div class="d-flex justify-content-between align-items-center align-bottom">
        <a href="#" class="btn btn-success" id="add-to-cart">Add to Cart</a>
        <a href="#" class="btn btn-outline-secondary"><i class="bi bi-heart"></i></a>
      </div>
      <div class="rating">
        <input type="radio" name="rating" id="rating-5">
        <label for="rating-5"><i class="bi bi-star-fill"></i></label>
        <input type="radio" name="rating" id="rating-4">
        <label for="rating-4"><i class="bi bi-star-fill"></i></label>
        <input type="radio" name="rating" id="rating-3">
        <label for="rating-3"><i class="bi bi-star-fill"></i></label>
        <input type="radio" name="rating" id="rating-2">
        <label for="rating-2"><i class="bi bi-star-fill"></i></label>
        <input type="radio" name="rating" id="rating-1">
        <label for="rating-1"><i class="bi bi-star-fill"></i></label>
      </div>
      </div>
    </div>
  `;

  bookCard.addEventListener("click", (e) => {
    window.location.href = `detail.html?book_Id=${id_book}`;
  });
  bookCard.querySelector("a#add-to-cart").addEventListener("click", (e) => {
    e.stopPropagation();
    const bookData = {
      idBook: id_book,
      customerId: customerId,
      bookPrice: Number(book_price),
      quantity: 1,
    };

    fetch("./src/php/add_to_cart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getQuery(bookData),
    })
      .then((response) => response.json())
      .then((data) => {
        updateCartCount();
      })
      .catch((error) => alert(error));
  });
  bookCardCol.appendChild(bookCard);
  return bookCardCol;
}

/*for (let i = 0; i < 1; i++) {
  const obj = {
    book_image:
      "<img src='./src/Image/1_380x.jpeg' class='d-block w-100' alt=''/>",
    book_title: "Chaos-19",
    book_author: "kalkidan",
    id_book: 3 + i,
    book_price: 152,
  };
  container.appendChild(getBookCard(obj));
}
*/
