$(document).ready(function () {
  $("#features").owlCarousel({
    items: 4,
    autoplay: true,
    nav: false,
    autoPlaySpeed: 500,
    autoPlayTimeout: 5000,
    autoPlayHoverPause: true,
    margin: 10,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

$(document).ready(function () {
  $("#news").owlCarousel({
    items: 4,
    nav: true,
    loop: true,
    margin: 10,
    dots: false,
    autoplay: false,
    slideTransition: "linear",
    autoplayTimeout: 6000,
    autoplaySpeed: 8000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

$(".bxslider").bxSlider({
  mode: "fade",
  pagerCustom: "#bx-pager",
  controls: false,
});

const container = document.querySelector("#bestseller");
const topRated = document.querySelector("#top-rated");

fetch("./src/php/bestselling_book.php")
  .then((response) => response.json())
  .then((data) => {
    data.result.bookInfo.forEach((value, index) => {
      container.appendChild(getBookCard(value));
      topRated.appendChild(getBookCard(value));
    });
    $(document).ready(function () {
      $("#bestseller").owlCarousel({
        items: 8,
        nav: false,
        loop: true,
        margin: 10,
        dots: false,
        autoplay: true,
        slideTransition: "linear",
        autoplayTimeout: 6000,
        autoplaySpeed: 8000,
        autoplayHoverPause: true,
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

fetch("./src/php/get_book_by_category.php?q=Trade Fiction Paperback")
  .then((response) => response.json())
  .then((data) => {
    data.result.bookInfo.forEach((value, index) => {
      topRated.appendChild(getBookCard(value));
    });
    $(document).ready(function () {
      $("#top-rated").owlCarousel({
        items: 8,
        nav: false,
        loop: true,
        margin: 10,
        dots: false,
        autoplay: true,
        slideTransition: "linear",
        autoplayTimeout: 6000,
        autoplaySpeed: 8000,
        autoplayHoverPause: true,
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
fetch("./src/php/get_book_by_category.php?q=Young Adult Hardcover")
  .then((response) => response.json())
  .then((data) => {
    data.result.bookInfo.forEach((value, index) => {
      document.querySelector("#limited-offer").appendChild(getBookCard(value));
    });
    $(document).ready(function () {
      $("#limited-offer").owlCarousel({
        items: 8,
        nav: false,
        loop: true,
        margin: 10,
        dots: false,
        autoplay: true,
        slideTransition: "linear",
        autoplayTimeout: 6000,
        autoplaySpeed: 8000,
        autoplayHoverPause: true,
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

const getQuery = (obj) => {
  let query = [];
  for (var key in obj)
    query.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));

  return query.join("&");
};

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
        console.log(data);
        updateCartCount();
      })
      .catch((error) => alert(error));
  });
  return bookCard;
}

