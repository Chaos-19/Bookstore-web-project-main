const formElemen = document.querySelector("#contact");

formElemen.addEventListener("submit", (e) => {

  e.preventDefault();

  let formData = new FormData(formElemen);

  fetch("./src/php/add_complaint.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      showModal('Success', data.message)
      formElemen.reset();
    }).catch(error => {
      alert(error)
      showModal('error', 'somthing Went Wrong please try again')
    })

})
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