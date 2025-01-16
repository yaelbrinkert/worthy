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

// FAIRE UN TABLEAU A IMPORTER (QUI COMPORTE LES ID DES PRODUITS, ON VA LES RETROUVER DANS LA BDD PUIS CHERCHER LEUR VARIANT ET PAR CONSEQUENT LEUR PRIX)
async function checkoutSingleProduct(idOfProduct) {
  try {
    const response = await fetch(`${urlBackend}/users/checkoutsingle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idOfProduct }),
    });
  } catch (err) {
    console.error('Erreur', err);
  }
}

function actualizePriceAndReductedPrice(price, reductprice) {
  realPriceWrapper.innerHTML = `${price}€`;
  reductedPriceWrapper.innerHTML = `${reductprice}€`;
}

function createInputsForVariants(idVariant, key, value, price, reductedprice) {
  const filterItem = document.querySelector('#filterItem');
  const labelInput = document.createElement('label');
  labelInput.setAttribute('for', `${key}_${value}`);
  labelInput.textContent = `${value}`;
  labelInput.className = 'label_attributes';

  const inputAttribute = document.createElement('input');
  inputAttribute.type = 'radio';
  inputAttribute.name = key;
  inputAttribute.setAttribute('data-id-variant', idVariant);
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
    const containerOrder = document.querySelector('.wrapper__order');
    containerOrder.classList.add('open__order');
    // Input of selected value
    const allInputsSelected = document.querySelectorAll(
      'input[type="radio"]:checked'
    );
    // const idOfProduct = allInputsSelected.getAttribute('data-id-variant');
    // checkoutSingleProduct(idOfProduct);
    initialize();
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
          variant._id,
          key,
          value,
          variant.price,
          variant.reducted_price
        );
      } else {
        // Si ce n'est pas un vrai Map (mais un objet), on utilise Object.entries
        Object.entries(attributes).forEach(([key, value]) => {
          createInputsForVariants(
            variant._id,
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

const closeOrderWrapper = document.querySelector('.wrapper__order');
const closeOrder = document.querySelector('.close__order');
closeOrder.addEventListener('click', () => {
  closeOrderWrapper.classList.remove('open__order');
});

const stripe = Stripe(
  'pk_test_51JPWqLIuG2X5dLxKQhNHn9yQV6gzs87oyT8k2qHwuMhOrZCFpT3F9vXzzWcdJJ02N58eq23DwECJFC0M2s9CT5C100eoFFA0Z9'
);

let elements;

const items = [{ id: 'xl-tshirt', amount: 1000 }];

// initialize();

document
  .querySelector('#payment-form')
  .addEventListener('submit', handleSubmit);

async function initialize() {
  const response = await fetch(`${urlBackend}/users/checkoutsingle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElementOptions = {
    layout: 'accordion',
  };

  const paymentElement = elements.create('payment', paymentElementOptions);
  paymentElement.mount('#payment-element');
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: 'http://127.0.0.1:8080/complete.html',
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === 'card_error' || error.type === 'validation_error') {
    showMessage(error.message);
  } else {
    showMessage('An unexpected error occurred.');
  }

  setLoading(false);
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector('#payment-message');

  messageContainer.classList.remove('hidden');
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add('hidden');
    messageContainer.textContent = '';
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('#submit').disabled = true;
    document.querySelector('#spinner').classList.remove('hidden');
    document.querySelector('#button-text').classList.add('hidden');
  } else {
    document.querySelector('#submit').disabled = false;
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#button-text').classList.remove('hidden');
  }
}
