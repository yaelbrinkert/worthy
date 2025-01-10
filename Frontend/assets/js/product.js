const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idQuery = urlParams.get('id');

const urlBackend = 'http://localhost:9876/api';

let bodyProduct = document.querySelector('.body-product');
const lightboxwrapper = document.getElementById('productimage');
const multipleImagesWrapper = document.getElementById('multimages');
const titleWrapper = document.querySelector('.title__shop');
const realPriceWrapper = document.querySelector('.actual__price');
const reductedPriceWrapper = document.querySelector('.reducted__price');
const descriptionProduct = document.querySelector('.description__product');

const skeletonSpecificWrapper = document.querySelector('.skeleton__wrapper');

function showSkeletonLoaderSpecific() {
  skeletonSpecificWrapper.classList.add('show_skeleton');
}

function hideSkeletonLoaderSpecific() {
  skeletonSpecificWrapper.classList.remove('show_skeleton');
}

function removeChildFrom(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function lightboxImage(image) {
  removeChildFrom(lightboxwrapper);
  const imageToInclude = document.createElement('img');
  imageToInclude.src = `./assets/images/${image}`;
  lightboxwrapper.appendChild(imageToInclude);
  updateCarouselActiveImage(image);
}

function carouselLightboxImages(image) {
  const img = document.createElement('img');
  img.src = `./assets/images/${image}`;
  img.setAttribute('onclick', `lightboxImage("${image}")`);
  multipleImagesWrapper.appendChild(img);
}

function updateCarouselActiveImage(activeImage) {
  // Récupère toutes les images du carrousel
  const carouselImages = multipleImagesWrapper.querySelectorAll('img');

  carouselImages.forEach((img) => {
    // Ajoute la classe 'active_image' à l'image correspondante
    if (img.src.includes(activeImage)) {
      img.classList.add('active_image');
    } else {
      // Supprime la classe des autres images
      img.classList.remove('active_image');
    }
  });
}

async function getSpecificVariants(idProduct) {
  try {
    const response = await fetch(
      `${urlBackend}/items/getspecificvariants/${idProduct}`
    );
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function getSpecificProduct(idProduct) {
  try {
    const response = await fetch(
      `${urlBackend}/items/getspecificitem/${idProduct}`
    );
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function checkoutSingleProduct(idProduct) {
  try {
    const response = await fetch(`${urlBackend}/users/checkout-single`);
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur', err);
  }
}

function actualizePriceAndReductedPrice(price, reductprice) {
  realPriceWrapper.innerHTML = `${price}€`;
  reductedPriceWrapper.innerHTML = `${reductprice}€`;
}

function createInputsForVariants(key, value, price, reductedprice) {
  const filterItem = document.querySelector('#filterItem');
  const labelInput = document.createElement('label');
  labelInput.setAttribute('for', `${key}_${value}`);
  labelInput.textContent = `${value}`;
  labelInput.className = 'label_attributes';

  const inputAttribute = document.createElement('input');
  inputAttribute.type = 'radio';
  inputAttribute.name = key;
  inputAttribute.setAttribute('data-price', price);
  inputAttribute.setAttribute('data-reductedprice', reductedprice);
  inputAttribute.className = 'input_attributes';
  inputAttribute.id = `${key}_${value}`;
  inputAttribute.value = value;

  filterItem.appendChild(inputAttribute);
  filterItem.appendChild(labelInput);

  const firstInput = document.querySelectorAll(`input[name="${key}"]`)[0];
  firstInput.setAttribute('checked', true);

  const inputListener = document.querySelectorAll(`input[name="${key}"]`);
  inputListener.forEach((i) => {
    i.addEventListener('click', function () {
      const dataPrice = i.getAttribute('data-price');
      const dataReductedPrice = i.getAttribute('data-reductedprice');
      actualizePriceAndReductedPrice(dataPrice, dataReductedPrice);
    });
  });

  const initInputPrice = document.querySelectorAll(
    `input[name="${key}"]:checked`
  )[0];
  const dp = initInputPrice.getAttribute('data-price');
  const rdp = initInputPrice.getAttribute('data-reductedprice');
  actualizePriceAndReductedPrice(dp, rdp);
}

function createBasketAndBuyButtons() {
  const wrapperButtons = document.querySelector(
    '.wrapper__basket_and_buy__buttons'
  );
  const basketButton = document.createElement('button');
  basketButton.className = 'button__basket';
  basketButton.innerHTML =
    'Ajouter au panier <i class="fa fa-shopping-bag fa-lg space-fa"></i>';

  const buyButton = document.createElement('button');
  buyButton.className = 'button__buy';
  buyButton.innerHTML =
    'Acheter <i class="fa fa-credit-card fa-lg space-fa"></i>';
  wrapperButtons.appendChild(basketButton);
  wrapperButtons.appendChild(buyButton);
  buyButton.addEventListener('click', function () {
    checkoutSingleProduct(1);
  });
}

async function showItem(idProduct) {
  showSkeletonLoaderSpecific();
  try {
    const productDatas = await getSpecificProduct(idProduct);
    const variantsProduct = await getSpecificVariants(idProduct);

    for (let i = 0; i < productDatas.image.length; i++) {
      carouselLightboxImages(productDatas.image[i]);
    }

    titleWrapper.innerHTML = `${productDatas.subcategory} <wty>${productDatas.name}</wty>`;
    // realPriceWrapper.innerHTML = `${productDatas.price}€`;
    // reductedPriceWrapper.innerHTML = `${productDatas.reductedprice}€`;
    descriptionProduct.innerHTML = `<div class="small-title-description">Description</div><div class="description__product">${productDatas.description}</div>`;
    lightboxImage(productDatas.image[0]);

    variantsProduct.forEach((variant) => {
      const attributes = variant.attributes;
      if (attributes instanceof Map) {
        createInputsForVariants(
          key,
          value,
          variant.price,
          variant.reducted_price
        );
      } else {
        // Si ce n'est pas un vrai Map (mais un objet), on utilise Object.entries
        Object.entries(attributes).forEach(([key, value]) => {
          createInputsForVariants(
            key,
            value,
            variant.price,
            variant.reducted_price
          );
        });
      }
    });
    createBasketAndBuyButtons();
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    hideSkeletonLoaderSpecific();
  }
}

showItem(idQuery);
