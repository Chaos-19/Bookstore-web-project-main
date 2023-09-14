import { makeRequest, grapFormData, displayError } from "./commonFunction.js";

const formElement = document.getElementById("signin");
const smallScreenError = document.querySelector(".alert-xs");
const middleScrean = document.querySelector(".alert-sm");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(formElement);

  if (formElement.checkValidity()) {
    let query = grapFormData(formData).join("&");
    displayError(
      "password are not the same",
      !isValueEqule(formElement, "password", "cpassword")
    );
    if (isValueEqule(formElement, "password", "cpassword")) {
      main("./src/php/signin.php", query);
    }
  }
});

const isValueEqule = (form, value1, value2) =>
  form[value1].value === form[value2].value ||
  form[value1].length < form[value1].minLength;

if (!formElement.checkValidity()) {
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
}

async function main(url, query) {
  // Make the request and get the result
  const result = await makeRequest(url, query, "POST");
  if (result.registered) {
    document.querySelector(".overlay").classList.remove("d-none");
  } else if (result["user exist"]) {
    displayError(result.message, true);
  } else {
    displayError("There was an error with the request.", true);
  }
  return result;
} /*
async function checkUser(email, url, query) {
  const result = await makeRequest(url, query, "POST");

  if (result.user) {
    displayError(`${email} This email already exists`, true);
    return;
  } else {
    const url2 = "./src/php/signin.php";
    main(url2, query);
  }
}*/
