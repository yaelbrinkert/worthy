const signup_user_form = document.querySelector('#signup_user_form');
const linkBack = 'http://localhost:9876/api';

function clearChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const formRegisterUser = document.querySelector('.register_user_form');
const error_signup_wrapper = document.querySelector('.error_signup');

function userTriesToSignup(data) {
  fetch(linkBack + '/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((success) => {
      if (success.success === false) {
        error_signup_wrapper.innerHTML = `${success.message}`;
      } else {
        error_signup_wrapper.innerHTML =
          "Vous êtes inscrits, <a href='./login.php'>connectez-vous</a>";
      }
    });
}

formRegisterUser.addEventListener('submit', function (event) {
  event.preventDefault();
  const formDataRegister = new FormData(formRegisterUser);
  const data = Object.fromEntries(formDataRegister.entries());

  const emailToVerify = data.email;
  if (emailToVerify.indexOf('@') > 0) {
    if (data.password === data.verification_password) {
      userTriesToSignup(data);
    } else {
      error_signup_wrapper.innerHTML =
        'Les mot-de-passes ne correspondent pas.';
    }
  } else {
    error_signup_wrapper.innerHTML =
      "L'email n'est pas conforme, veuillez réessayer.";
  }
});
