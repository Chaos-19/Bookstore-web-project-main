const container = document.querySelector("#related-product");
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("book_Id");

  const url = `./src/php/get_book_details.php?q=${Number(bookId)}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const book = data.result[0];
      document.querySelector(".image-container").innerHTML = book.book_image;

      document.querySelector("#book-title").textContent = book.book_title;
      document.querySelector(".author").textContent = book.book_author;
      document.querySelector("#bookdescription").textContent =
        book.book_description;

      document.querySelector("span.category").textContent = book.book_category;

      fetch(`./src/php/get_related_books.php?q=${book.book_category}`)
        .then((response) => response.json())
        .then((data) => {
          data.result.bookInfo.forEach((value, index) => {
            container.appendChild(getBookCard(value));
          });
          $(document).ready(function () {
            $("#related-product").owlCarousel({
              items: 8,
              nav: false,
              margin: 10,
              dots: false,
              responsive: {
                0: {
                  items: 2,
                },
                600: {
                  items: 3,
                },
                1000: {
                  items: 5,
                },
              },
            });
          });
        })
        .catch((error) => alert(error));

      document.querySelector(".price").textContent = book.book_price;

      document.querySelector("#author").textContent = book.book_author;
      document.querySelector("#title").textContent = book.book_title;
      // button;
      document
        .querySelector("button#add-to-cart")
        .addEventListener("click", (e) => {
          alert("alert button Click");
          fetch("./src/php/add_to_cart.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: getQuery({
              idBook: Number(bookId),
              bookPrice: Number(book.book_price),
              quantity: Number(
                document.querySelector("input#cart-count").value
              ),
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              updateCartCount();
            })
            .catch((error) => alert(error));
        });
      // end;
      fetch(`https://openlibrary.org/isbn/${book.ISBN}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const workId = data.works[0].key;
          document.querySelector('#publication').textContent = data.publish_date;
          return fetch(`http://openlibrary.org${workId}.json`);
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(secondData => {

          document.querySelector(".description").innerHTML =
            secondData.description ? typeof secondData.description === 'object' ? secondData.description.value : secondData.description : "No Description !!";
        })
        .catch(error => {
          alert('An error occurred:' + error);
          document.querySelector(".description").innerHTML = "You Are offline "
        });
      //share

    })
    .catch((error) => {
      alert("An error occurred:", error);
    });
});


$(document).ready(function () {
  $("#minus").click(function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $("#plus").click(function () {
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

function getBookCard({
  id_book,
  book_image,
  book_title,
  book_author,
  book_price,
}) {
  const bookCard = document.createElement("div");
  bookCard.className = "card shadow my-4 book-card";
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
    <div class="card-body d-flex flex-column pb-3">
      <h5 class="card-">${book_title}</h5>
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

  bookCard.addEventListener("click", () => {
    window.location.href = `detail.html?book_Id=${id_book}`;
  });
  bookCard.querySelector("a#add-to-cart").addEventListener("click", (e) => {
    e.stopPropagation();
    fetch("./src/php/add_to_cart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getQuery({
        idBook: id_book,
        bookPrice: Number(book_price),
        quantity: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateCartCount();
      })
      .catch((error) => console.log(error));
  });
  return bookCard;
}
const getQuery = (obj) => {
  let query = [];
  for (var key in obj)
    query.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));

  return query.join("&");
};


const shareButton = document.getElementById("share");

shareButton.addEventListener("click", () => {

  const base64Image = document.querySelector(".image-container").querySelector("img").src;

  const file = new File([base64Image], "image.jpg", { type: "image/jpeg", });

  if (navigator.share) {
    const base64Image = document.querySelector(".image-container").querySelector("img").src;
    const file = new File([base64Image], "image.jpg", {
      type: "image/jpg",
    });

    navigator.share({
      title: document.querySelector("#book-title").textContent,
      text: "Check out this book!",
      url: window.location.href,
      files: [file],
    })
      .then(() => {
        console.log("Share successful");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
      });
  } else {
    console.log("Web Share API not supported");

  }
});
