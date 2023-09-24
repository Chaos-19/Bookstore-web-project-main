const tableBody = document.querySelector("tbody");

const priceBorder = document.querySelector("#totalprice");

const cartCard = document.querySelector("#cart-card");

let orderId = [];

document.addEventListener("DOMContentLoaded", () => {
  updateCard();
});

function updateCard() {
  cartCard.innerHTML = "";
  tableBody.innerHTML = "";
  fetch("./src/php/get_orders_info.php")
    .then((response) => response.json())
    .then((data) => {
      let cartData = data.result.books;
      if (cartData.length == 0) {
        isCartEmpty(0);
      } else {
        updateCartpageInfo();
        cartData.forEach((v) => {
          setCartItemCard(v);
          setCartItemTable(v);
          document.querySelector("#container").style.display = "block";
          document.querySelector("#emptycart").classList.add("d-none");
        });
      }
    })
    .catch((error) => alert(error));
}
document.querySelector("button#clearCart").addEventListener("click", (e) => {
  fetch("./src/php/clear_cart.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        updateCartpageInfo();
        cartCard.innerHTML = "";
        tableBody.innerHTML = "";
      }
    })
    .catch((error) => alert(error));
});

function setCartItemTable({
  book_id,
  id_order,
  customer_id,
  book_image,
  book_title,
  book_author,
  book_price,
  quantity,
}) {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML += `
  <td class="p-0">
    <div class="container  py-5">
      <div class="row m-0 align-items-md-center p-0">
        <div class="col-4 p-0">
             ${book_image}
        </div>
        <div class="col-8 text-start content">
          <span class="d-block title">${book_title}</span>
          <span class="d-block author fs-6">${book_author}</span>
          <span class="d-block color"></span>
        </div>
      </div>
    </div>
  </td>
  <td class="px-1">
     $${book_price}
  </td>
  <td class="px-1">
    <div class="col d-inline-flex border m-0">
      <button id="plus" type="button" class="btn btn-outline-secondary"><i class="bi bi-chevron-up"></i></button>
      <input type="number" name="quantity" id="quantity" value="${quantity}" class="form-control form-control-lg flex-grow-0 text-center" />
      <button id="minus" type="button" class="btn btn-outline-secondary"><i class="bi bi-chevron-down"></i></button>
    </div>
  </td>
  <td class="px-2 position-relative text-center" id="totalprice">
    $${Number(book_price) * Number(quantity)}
     <div class="position-absolute bottom-0 d-flex align-items-center gap-2">
       <button id="deleteItem" class="btn btn-sm fs-6" type="button"><I class="bi bi-x fs-1"></i></button><span class="text-sm">remove</span>
      </div>
  </td>`;

  tableRow.querySelector("#plus").addEventListener("click", (e) => {
    let input = tableRow.querySelector("input");
    input.value = Number(input.value) + 1;

    fetch("./src/php/add_to_cart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getQuery({
        idBook: book_id,
        bookPrice: book_price,
        quantity: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateCartpageInfo();
        let cartData = data.productInfo;
        tableRow.querySelector("#totalprice").childNodes[0].textContent =
          "$" + cartData.newTotal;
      })
      .catch((error) => alert(error));
  });

  tableRow.querySelector("#minus").addEventListener("click", (e) => {
    let input = tableRow.querySelector("input");
    if (Number(input.value) > 1) {
      fetch("./src/php/add_to_cart.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: getQuery({
          idBook: book_id,
          bookPrice: book_price,
          quantity: -1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          updateCartpageInfo();
          let cartData = data.productInfo;
          tableRow.querySelector("#totalprice").childNodes[0].textContent =
            "$" + cartData.newTotal;
        })
        .catch((error) => alert(error));
      input.value = Number(input.value) - 1;
    }
  });
  tableRow.querySelector("#deleteItem").addEventListener("click", (e) => {
    fetch(`./src/php/delete_cart_item.php?id=${id_order}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          updateCartpageInfo();
          tableRow.remove();
        }
      })
      .catch((error) => alert(error));
  });

  tableBody.appendChild(tableRow);
}
function setCartItemCard({
  book_id,
  id_order,
  customer_id,
  book_image,
  book_title,
  book_author,
  book_price,
  quantity,
}) {
  const card = document.createElement("div");
  card.classList.add("col");
  card.classList.add("shadow-sm");
  card.classList.add("border");
  card.id = "cart-description";
  card.innerHTML += `
                <div class="row m-0 p-0 align-items-center">
                  <div class="col-3 p-0">
                 ${book_image}
                  </div>
                  <div class="col-7 text-start cart-content">
                    <span class="d-block fs-4 title">   ${book_title}</span>
                    <span class="d-block fs-6 author">   ${book_author}</span>
                    <div class="col d-inline-flex mt-1" id="quantitySet">
                      <button id="plus" type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-chevron-up"></i></button>
                      <input type="number" name="quantity" id="quantity" value="${quantity}" class="form-control form-control-sm text-center" />
                      <button id="minus" type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-chevron-down"></i></button>
                    </div>
                    <span class="d-block mt-2 fs-3" id="totalprice">$${Number(book_price) * Number(quantity)}</span>
                  </div>
                  <div class="col-2 ms-auto">
                    <button id="deleteItem" class="btn-close" type="button"></button>
                  </div>
                </div>
  `;

  card.querySelector("#quantitySet #plus").addEventListener("click", (e) => {
    let input = card.querySelector("input");
    input.value = Number(input.value) + 1;

    const bookData = {
      idBook: book_id,
      customerId: customerId,
      bookPrice: book_price,
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
        updateCartpageInfo();
        let cartData = data.productInfo;
        card.querySelector("#totalprice").childNodes[0].textContent =
          "$" + cartData.newTotal;
      })
      .catch((error) => alert(error));
  });

  card.querySelector("#quantitySet #minus").addEventListener("click", (e) => {
    let input = card.querySelector("input");
    if (Number(input.value) > 1) {
      const bookData = {
        idBook: book_id,
        customerId: customerId,
        bookPrice: book_price,
        quantity: -1,
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
          updateCartpageInfo();
          let cartData = data.productInfo;
          card.querySelector("#totalprice").childNodes[0].textContent =
            "$" + cartData.newTotal;
        })
        .catch((error) => alert(error));
      input.value = Number(input.value) - 1;
    }
  });
  card.querySelector("#deleteItem").addEventListener("click", (e) => {
    fetch(`./src/php/delete_cart_item.php?id=${id_order}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          updateCartpageInfo();
          card.remove();
        }
      })
      .catch((error) => alert(error));
  });
  return cartCard.appendChild(card);
}
const getQuery = (obj) => {
  let query = [];
  for (var key in obj)
    query.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));

  return query.join("&");
};
function updateCartpageInfo() {
  fetch("./src/php/update_stutes.php")
    .then((response) => response.json())
    .then((data) => {
      isCartEmpty(data.cartCount)
      document.querySelector("#cart-count").textContent = data.cartCount;
      document.querySelector("span#itemsNo").textContent = data.cartCount;
      document.querySelector("span#Total").textContent = data.total;
      document.querySelector("span#totalItemprice").textContent =
        "$" + data.total;
    })
    .catch((error) => alert(error));
}
const isCartEmpty = (count) => {
  if (Number(count) === 0) {
    document.querySelector("#container").style.display = "none";
    document.querySelector("#emptycart").classList.remove("d-none");
  }
}