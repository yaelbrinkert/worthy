export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'wrapper__footer';
  footer.innerHTML = `
    <img class="wrapper__footer__logo" src="./assets/images/logo_worthy_v1.png" alt="">
    <div class="wrapper__links__copyright">
        <div class="links__footer">
            <li><a href="#">Politique de Confidentialité</a></li>
            <hr>
            <li><a href="#">Mentions Légales</a></li>
            <hr>
            <li><a href="#">Politique de Cookies</a></li>
            <hr>
            <li><a href="#">Conditions Générales de Vente ou d'Utilisation</a></li>
            <hr>
            <li><a href="#">Nous contacter</a></li>
        </div>
        <div class="copyright__footer">
            <p>Copyright © 2025 Worthy Inc. All rights reserved.</p>
        </div>
    </div>
`;
  return footer;
}

export function attachFooter(target) {
  const footer = createFooter();
  target.prepend(footer);
}
