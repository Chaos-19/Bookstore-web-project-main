
document.addEventListener("DOMContentLoaded", () => {
  fetch("./src/php/authenticat.php")
    .then((response) => response.json())
    .then((data) => {
      if (!data.authorized) {
        window.location.href = "./Login.html";
      }
    })
    .catch((error) => alert(error));

})




const formElement = document.getElementById("addBook");

formElement.addEventListener("submit", (e) => {

  e.preventDefault();

  let formData = new FormData(formElement);

  fetch('./src/php/add_books.php', {
    method: "POST",
    body: formData
  }).then(res => res.json())
    .then(data => {
      showModal({
        title: "Success!",
        message: data.message,
        onClose: function () {
          console.log("Modal closed");
        }

      });
    }).catch(error => console.log(error))
});

function showModal({ title, message }) {
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
document.querySelectorAll("input").forEach((v, i) => {
  v.addEventListener("invalid", function (e) {
    if (!e.target.checkValidity()) {
      e.target.classList.add("is-invalid");
    }
  });
  v.addEventListener("input", function (e) {
    if (e.target.checkValidity()) {
      e.target.classList.remove("is-invalid");
    }
  });
});