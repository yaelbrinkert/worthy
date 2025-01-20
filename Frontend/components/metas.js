export function createMetas() {
  const metas = document.createDocumentFragment(); // Utilisez un fragment pour éviter des conteneurs inutiles

  // Ajout des liens CSS principaux
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = './assets/css/main.css';
  metas.appendChild(stylesheet);

  // Ajout des polices via FontAwesome
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
  metas.appendChild(fontAwesome);

  return metas;
}

export function attachMetas(target) {
  const metas = createMetas();
  target.appendChild(metas); // Ajoute les métadonnées directement à l'élément cible
}
