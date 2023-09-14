import { makeRequest, grapFormData, displayError } from "./commonFunction.js";

const formElement = document.getElementById("login");
const smallScreenError = document.querySelector(".alert-xs");
const middleScrean = document.querySelector(".alert-sm");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  let formValues = new FormData(formElement);

  if (formElement.checkValidity()) {
    let query = grapFormData(formValues).join("&");
    const url = "./src/php/login.php";
    main(url, query);
  }
});

async function main(url, query) {
  // Make the request and get the result
  try {
    const result = await makeRequest(url, query, "POST");

    if (result) {
      const data = JSON.parse(result.data);

      if (result.user) {
        if (result.verified) {
          if (result.role.match("customer")) {
            window.location.href = "./index.html";
          } else if (result.role.match("admin")) {
            window.location.href = "./dashboard.html";
          }
        } else {
          displayError(data.message, true);
        }
      } else {
        displayError(result.message, true);
      }
    } else {
      displayError("There was an error with the Network", ttrue);
    }
  } catch (e) {
    console.log(e);
  }
}

if (formElement.checkValidity()) {
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



/*import {
  makeRequest,
  grapFormData,
  displayError
} from "./commonFunction.js";


const formElement = document.getElementById('login');
const smallScreenError = document.querySelector('.alert-xs');
const middleScrean = document.querySelector('.alert-sm');

formElement.addEventListener('submit', function(e) {
  e.preventDefault();
  let formValues = new FormData(formElement);

  if (formElement.checkValidity()) {
    let query = grapFormData(formValues).join("&");
    const url = "./src/php/login.php";

    main(url, query);
  }
});



async function main(url, query) {
  // Make the request and get the result
  try {
    const result = await makeRequest(url,
      query,
      "POST");


    if (result) {
      const data = JSON.parse(result.data);

      if (result.user) {
        if (result.verified) {
          if (result.role.match("user")) {
            window.location.href = "./index.html";
          } else if (result.role.match("admin")) {
            window.location.href = "./dashboard.html";
          }
        } else {
          displayError(data.message, true);
        }
      }
      else {
        displayError(result.message, true);
      }
    } else {
      displayError("There was an error with the Network", ttrue);
    }
  }catch(e) {
    console.log(e);
  }
}


if (formElement.checkValidity()) {}
document.querySelectorAll('input').forEach((v, i) => {
  v.addEventListener('invalid', function(e) {
    if (!e.target.checkValidity()) {
      e.target.classList.add('is-invalid');
    }})
  v.addEventListener("input",
    function(e) {
      if (e.target.checkValidity()) {
        e.target.classList.remove('is-invalid');
      }
    })
})
*/