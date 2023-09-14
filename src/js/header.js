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
      document.querySelector("#cart-count").textContent = Number(
        data.cartCount
      );
      
    })
    .catch((error) => alert(error));
}

document.querySelector("#logout").addEventListener("click", () => {
  fetch("./src/php/Logout.php", { method: "POST" }).catch((error) =>
    console.log(error)
  );
});
