var makeRequest = async (url, query, method)=> {
  try {
    let res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: query,
    })
    let result = res.json();
    return result;
  }catch (e) {
    console.log(e);
    return null
  }
}
// fun to get form data in form array of the form value
function grapFormData(formValues) {
  let encodedData = [];

  for (var key of formValues.entries()) {
    encodedData.push(encodeURIComponent(key[0]) + '=' +
      encodeURIComponent(key[1]));
  }
  return encodedData;
}


/*function validateForm(formValues) {
  for (var value of formValues) {
    if (value[1] === "") return false;
  }
  return true;
}*/

function displayError(error, condition) {
  const smallScreenError = document.querySelector('.alert-xs');
  const middleScreen = document.querySelector('.alert-sm');

  if (condition) {
    if (window.innerWidth < 880) {
      smallScreenError.classList.remove('d-none');
      smallScreenError.textContent = error;
    } else {
      middleScreen.classList.remove('d-none');
      middleScreen.textContent = error;
    }
    console.log("setTimeout .....")
    setTimeout(()=>displayError('error', false), 10000);
  }
  document.querySelectorAll('input').forEach((v, i) => {
    v.addEventListener('input', function(e) {
      if (!smallScreenError.classList.contains('d-none')) {
        smallScreenError.classList.add('d-none');
      }
      if (!middleScreen.classList.contains('d-none')) {
        middleScreen.classList.add('d-none');
      }
    });
  });
}


export {
  makeRequest,
  grapFormData,
  displayError
};