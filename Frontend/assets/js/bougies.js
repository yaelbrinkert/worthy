const urlBackend = 'http://localhost:9876/api';
const container__form = document.querySelector('.container__form');
const container__image = document.querySelector('.container__image');
const type_container = document.querySelector('#type_container');
const uc_title1 = document.querySelector('.uc_title1');
const uc_title2 = document.querySelector('.uc_title2');
const price_candle = document.querySelector('#price_candle');
const ml_container = document.querySelector('#ml_container');

let candlePrice = 3;

async function getCandlesPossibility() {
  try {
    const response = await fetch(`${urlBackend}/candles/getcandlespossibility`);
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur: ', err);
  }
}

async function getSpecificCandlePossibility(idCandle) {
  try {
    const response = await fetch(
      `${urlBackend}/candles/getspecificcandlepossibility/${idCandle}`
    );
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

// function updatePrice(addPrice) {
//   candlePrice = candlePrice + (Number(addPrice) || 0);
//   price_candle.innerHTML = `${candlePrice}€`;
// }
// updatePrice();

function lightboxImageForm(idImg) {
  container__image.innerHTML = `<img src="./assets/images/${idImg}" class="animationLightbox">`;
}

async function step1() {
  try {
    const candlesPossibilities = await getCandlesPossibility();
    const title = document.createElement('p');
    title.textContent = 'Sélectionner votre type de conteneur :';
    uc_title1.appendChild(title);
    candlesPossibilities.forEach((a) => {
      // Créer un input radio
      const newInputGlass = document.createElement('input');
      newInputGlass.type = 'radio';
      newInputGlass.value = `${a._id}`;
      newInputGlass.setAttribute('data-img', `${a.image}`);
      newInputGlass.setAttribute('data-id', `${a._id}`);
      newInputGlass.name = 'inputtypeglass';
      // Ajoute un ID unique pour l'associer au label
      newInputGlass.id = `glass_${a._id}`;

      // Créer le label
      const newLabelInputGlass = document.createElement('label');
      newLabelInputGlass.classList = 'label_glass_type';
      // Lier le label au input via l'attribut "for"
      newLabelInputGlass.setAttribute('for', `glass_${a._id}`);
      newLabelInputGlass.textContent = `${a.name}`;

      newLabelInputGlass.addEventListener('click', function () {
        lightboxImageForm(a.image);
        step2(`${a._id}`);
      });

      // Ajouter le tout au conteneur
      type_container.appendChild(newInputGlass);
      type_container.appendChild(newLabelInputGlass);
    });

    const firstInputRadio = document.querySelectorAll(
      'input[name="inputtypeglass"]'
    )[0];
    firstInputRadio.setAttribute('checked', true);
    step2(`${firstInputRadio.getAttribute('data-id')}`);
    const valueFirstInput = firstInputRadio.getAttribute('data-img');
    lightboxImageForm(valueFirstInput);
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function step2(idCandleChosen) {
  try {
    uc_title2.innerHTML = 'Choisissez la taille de votre bougie :';
    const candlesPossibilities = await getSpecificCandlePossibility(
      idCandleChosen
    );
    ml_container.innerHTML = '';
    candlesPossibilities.sizes.forEach((s) => {
      const pricePossibility = s.price;
      const newInputSizeAvalaible = document.createElement('input');
      newInputSizeAvalaible.name = 'radioSizeInput';
      newInputSizeAvalaible.type = 'radio';
      newInputSizeAvalaible.setAttribute('data-price', pricePossibility);
      newInputSizeAvalaible.setAttribute('data-id', candlesPossibilities._id);
      newInputSizeAvalaible.id = `size_${s.size}`;
      newInputSizeAvalaible.value = `${s.size}`;

      const labelInputSizeA = document.createElement('label');
      labelInputSizeA.classList = 'label_glass_type';
      labelInputSizeA.setAttribute('for', `${newInputSizeAvalaible.id}`);

      labelInputSizeA.textContent = `${s.size}`;

      // newInputSizeAvalaible.addEventListener('click', function () {
      //   updatePrice(pricePossibility);
      // });

      ml_container.appendChild(newInputSizeAvalaible);
      ml_container.appendChild(labelInputSizeA);
    });

    const firstInputRadio = document.querySelectorAll(
      'input[name="radioSizeInput"]'
    )[0];
    firstInputRadio.setAttribute('checked', true);
  } catch (err) {
    console.error('Erreur:', err);
  }
}

// step2('676da11953d8b73457ef05c5');
step1();

let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  let x = document.getElementsByClassName('tab');
  x[n].style.display = 'flex';
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = "J'ai terminé!";
  } else {
    document.getElementById('nextBtn').innerHTML =
      "Continuer <i class='fa fa-arrow-right-long'></i>";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName('tab');
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = 'none';
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById('userChoices').submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName('tab');
  y = x[currentTab].getElementsByTagName('input');
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == '') {
      // add an "invalid" class to the field:
      y[i].classList.add('invalid');
      // and set the current valid status to false:
      valid = false;
    } else {
      y[i].classList.remove('invalid');
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
    document.getElementsByClassName('step')[currentTab].innerHTML =
      "<i class='fa fa-check'></i>";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i,
    x = document.getElementsByClassName('step');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }
  //... and adds the "active" class to the current step:
  x[n].className += ' active';
}
