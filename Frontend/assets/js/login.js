const login_user_form = document.querySelector('#login_user_form');
const linkBack = 'http://localhost:9876/api';

function clearChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const formLoginUser = document.querySelector('.login_user_form');

function userTriesToLogin(data) {
  fetch(linkBack + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((success) => {
      if (!success.success) {
        const alertMessageLoginFailed = document.createElement('p');
        alertMessageLoginFailed.className = 'failed_login';
        alertMessageLoginFailed.innerText =
          'La connexion a échouée, veuillez rééssayer.';
        formLoginUser.appendChild(alertMessageLoginFailed);
      } else {
        window.location.href = 'index.php';
      }
    });
}

formLoginUser.addEventListener('submit', function (event) {
  event.preventDefault();
  const formDataLogin = new FormData(formLoginUser);
  const data = Object.fromEntries(formDataLogin.entries());

  userTriesToLogin(data);
});
