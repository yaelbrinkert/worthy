const urlback = 'http://localhost:9876/api';
const logout = document.querySelector('.nav-logout');
logout.addEventListener('click', function () {
  fetch(`${urlback}/users/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.error('Erreur');
    });
});
