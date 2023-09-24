let customerId = "";
document.addEventListener("DOMContentLoaded", function () {
  fetch("./src/php/authenticat.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.authorized) {
        updateCartCount();
        document.querySelector("#user_profile #user-id").textContent =
          data.user_id;
        customerId = data.user_id;
        document.querySelector("#user_profile #user-name").textContent =
          data.user_name;
        document.querySelector("#user_profile #user-email").textContent =
          data.user_email;
      } else {
        window.location.href = "./Login.html";
      }
    })
    .catch((error) => alert(error));
});

function updateCartCount() {
  fetch("./src/php/update_stutes.php")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#cart-count").textContent = Number(data.cartCount);

    })
    .catch((error) => alert(error));
}

document.querySelector("#logout").addEventListener("click", () => {
  fetch("./src/php/Logout.php", { method: "POST" }).catch((error) =>
    console.log(error)
  );
});

const searchBar = document.querySelector("input[type='search']")
const resulteBox = document.querySelector("#search-resultbox");
const resulteBoxContainer = document.querySelector("#search-resultContainer");

searchBar.addEventListener('input', (e) => {
  resulteBoxContainer.classList.remove("d-none");
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  fetch(`./src/php/searchBook.php?q=${e.target.value}`)
    .then(res => res.json())
    .then(data => {


      if (data.length <= 0 || e.target.value.length <= 0) {
        resulteBoxContainer.classList.add("d-none");
        document
          .getElementsByTagName("body")[0]
          .classList.remove("overflow-y-hidden");
      }
      resulteBox.innerHTML = "";
      data.result.forEach(v => {
        resulteBox.appendChild(searchItem(v))
      })
    }).catch(error => alert(error))
})


const searchItem = ({ book_image, book_title, book_author, id_book }) => {
  const item = document.createElement('li');


  item.innerHTML += `
               <li class="rounded border border-2 shadow-lg">
                  <div class="row">
                    <div class="col-3 col-md-2">
                 ${book_image}
                    </div>
                    <div class="col-6 text-start">
                      <span class="d-block fs-4 title mt-2">   ${book_title}</span>
                      <span class="d-block fs-6 author mt-3">   ${book_author}</span>
                    </div>
                  </div>
                </li>
           `
  item.addEventListener('click', () => {
    window.location.href = `detail.html?book_Id=${id_book}`;
  })
  return item;
}



document.querySelector("#subscribe").addEventListener('click', (e) => {
  const eamilAddress = document.querySelector("input#newsletter1");
  if (eamilAddress.checkValidity()) {
    e.preventDefault();
    fetch('./src/php/add_subscription.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { email: eamilAddress.value }
      )
    }).then(res => res.json())
      .then(data => {
        showModal('Success', data.message);
      }).catch(error => showModal('danger', "somthing Want wrong try later!!"));
  }
})


function showModal(title, message) {
  const modalHtml = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  $('#exampleModal').modal('show');
}
