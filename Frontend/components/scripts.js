/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>`; */

export function createScripts() {
  const scripts = document.createDocumentFragment(); // Utilisez un fragment pour éviter des conteneurs inutiles

  // Ajout des liens JS principaux
  const fontawesome = document.createElement('script');
  fontawesome.src = 'https://kit.fontawesome.com/0433bfbe12.js';
  fontawesome.setAttribute('crossorigin', 'anonymous');
  fontawesome.setAttribute('async', true);
  scripts.appendChild(fontawesome);

  const checkLogin = document.createElement('script');
  checkLogin.src = './assets/js/checklogin.js';
  scripts.appendChild(checkLogin);

  const logout = document.createElement('script');
  logout.src = './assets/js/logout.js';
  scripts.appendChild(logout);

  return scripts;
}

export function attachScripts(target) {
  const scripts = createScripts();
  target.appendChild(scripts); // Ajoute les métadonnées directement à l'élément cible
}
