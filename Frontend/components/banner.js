export function createBanner() {
  const banner = document.createElement('div');
  banner.classList = 'banner__promos';
  banner.innerHTML = `
  <p>
    En ce moment, profitez de 20% de réduction avec le code : <b>WORTHY20</b>
  </p>
`;
  return banner;
}

export function attachBanner(target) {
  const banner = createBanner();
  target.prepend(banner);
}
