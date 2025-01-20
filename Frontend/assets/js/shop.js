const wrapperShopItems = document.querySelector('.shop_items_wrapper');
const backendUrl = 'http://localhost:9876/api';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idQuery = urlParams.get('category');

let currentPage = 1;

const loaderSkeletonWrapper = document.querySelector(
  '.loader__skeleton__wrapper'
);
const wrapperFilterSubcategory = document.querySelector(
  '.wrapper__filters__filter'
);

function showSkeletonLoader() {
  loaderSkeletonWrapper.classList.add('display__skeleton__wrapper');
}

function hideSkeletonLoader() {
  loaderSkeletonWrapper.classList.remove('display__skeleton__wrapper');
}

async function getSpecificCategories(idOfQuery) {
  try {
    const response = await fetch(
      `${backendUrl}/items/getspecificcategories/${idOfQuery}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement des catégories:', error);
  }
}

async function buildCustomSubcategoryFilters(nameQuery) {
  const idQuery = await getSpecificCategories(nameQuery);

  const titleQuery = document.createElement('p');
  titleQuery.innerHTML = `<b>${nameQuery}</b>`;
  wrapperFilterSubcategory.appendChild(titleQuery);

  idQuery.subcategories.forEach((ssfc) => {
    const newFilter = document.createElement('label');
    newFilter.innerText = ssfc.name;

    const inputFilter = document.createElement('input');
    inputFilter.value = ssfc.name;
    inputFilter.type = 'checkbox';
    inputFilter.name = 'input';
    inputFilter.className = 'filter-category';

    inputFilter.addEventListener('change', () => {
      showItems(1);
    }); // Attach listener

    newFilter.appendChild(inputFilter);
    wrapperFilterSubcategory.appendChild(newFilter);
  });
}

function getSelectedValues(selector) {
  return Array.from(document.querySelectorAll(`${selector}:checked`)).map(
    (input) => input.value
  );
}

// // Use event delegation to handle dynamically created checkboxes
wrapperFilterSubcategory.addEventListener('change', (event) => {
  // Check if the event target is a checkbox
  if (event.target.type === 'checkbox') {
    const checkbox = event.target;

    // Add or remove the active_filter class on the parent label
    if (checkbox.checked) {
      checkbox.parentElement.classList.add('active_filter');
    } else {
      checkbox.parentElement.classList.remove('active_filter');
    }
  }
});

async function showItems(page) {
  showSkeletonLoader();

  const selectedCategories = getSelectedValues('.filter-category');
  const selectedPromotion = getSelectedValues('.filter-promos');

  // Get the name of the types for the query
  const nameQuery = await getSpecificCategories(idQuery);

  // Construct query parameters
  const queryParams = new URLSearchParams({
    page,
    limit: 12,
    category: nameQuery._id,
    promotion: selectedPromotion,
    subcategory: selectedCategories.join(','), // Pass multiple categories as comma-separated values
  });
  try {
    const response = await fetch(
      `${backendUrl}/items/getallitemspagination?${queryParams}`
    );
    const data = await response.json();

    // Nettoyer les anciens items
    wrapperShopItems.innerHTML = '';

    // Rendu des nouveaux items
    const cards = await Promise.all(data.items.map((item) => createCard(item)));
    cards.forEach((card) => wrapperShopItems.appendChild(card));

    if (cards.length === 0) {
      wrapperShopItems.textContent =
        'Aucun résultat pour ces critères, veuillez rééssayer.';
    }

    // Gérer la pagination (e.g., boutons next/previous)
    handlePagination(data.pagination);
  } catch (error) {
    console.error('Erreur lors du chargement des items :', error);
  } finally {
    hideSkeletonLoader();
  }
}

document
  .querySelectorAll('.wrapper__filters__filter input')
  .forEach((input) => {
    input.addEventListener('change', () => {
      showItems(1); // Reload items whenever a filter changes
    });
  });

async function getCategories() {
  try {
    const response = await fetch(`${backendUrl}/items/getcategories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement des catégories:', error);
  }
}

async function getSpecificVariants(idProduct) {
  try {
    const response = await fetch(
      `${backendUrl}/items/getspecificvariants/${idProduct}`
    );
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function createCard(item) {
  try {
    const variant = await getSpecificVariants(item._id);
    //
    const prices = variant.map((variant) => variant.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    //
    const reductedPrices = variant.map((variantr) => variantr.reducted_price);
    const minReductedPrice = Math.min(...reductedPrices);
    const maxReductedPrice = Math.min(...reductedPrices);

    const priceToShow = minReductedPrice
      ? `${minPrice}€ <span class="reduced_price">${minReductedPrice}€</span>`
      : `${minPrice}€`;

    const li = document.createElement('li');
    li.className = 'cards_item';
    li.setAttribute('data-card-category', item.id_category);
    // li.setAttribute('data-id-product', item._id);

    const imageOfTheProduct = item.image[0];

    li.innerHTML = `
    <div class="card">
      <div class="card_image">
        <a href="#" onclick="addToCart('${item._id}', 1)" class="like_btn"><i class="fa fa-shopping-cart"></i></a>
        <a href="./product.html?id=${item._id}" class="card_seem_more_button">Voir le produit</a>
        <img src="./assets/images/${imageOfTheProduct}" alt="${item.name}" />
      </div>
      <div class="card_content">
        <h2 class="card_title">${item.subcategory} <wty>"${item.name}"</wty></h2>
        <p class="card_text price_text">${priceToShow}</p>
        <div class="card_buttons">
          <a href="./product.html?id=${item._id}" class="card_btn">Acheter</a>
        </div>
      </div>
    </div>
  `;
    return li;
  } catch (err) {
    console.error('No possibility to display the cards', err);
  }
}

/* <p class="card_text">${item.description.substring(0, 85)}...</p>
<p class="card_sex">${categoryName}</p>
 */

function handlePagination(pagination) {
  const previousPageItems = document.querySelector('.btn-previous');
  const nextPageItems = document.querySelector('.btn-next');
  const wrapperPaginationNumbers = document.querySelector(
    '.page_number_wrapper'
  );

  previousPageItems.disabled = pagination.currentPage === 1;
  if (previousPageItems.disabled) {
    previousPageItems.classList.add('disabled_pagination');
  } else {
    previousPageItems.classList.remove('disabled_pagination');
  }
  nextPageItems.disabled = pagination.currentPage === pagination.totalPages;
  if (nextPageItems.disabled) {
    nextPageItems.classList.add('disabled_pagination');
  } else {
    nextPageItems.classList.remove('disabled_pagination');
  }

  wrapperPaginationNumbers.innerHTML = '';
  for (let i = 0; i < pagination.totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.className = 'page_number';
    const number = i + 1;
    if (pagination.currentPage === number)
      pageNumber.classList.add('active_page_number');
    pageNumber.innerHTML = `${number}`;
    wrapperPaginationNumbers.appendChild(pageNumber);
    pageNumber.onclick = () => showItems(number);
  }

  previousPageItems.onclick = () => showItems(pagination.currentPage - 1);
  nextPageItems.onclick = () => showItems(pagination.currentPage + 1);
}

// Chargement initial
buildCustomSubcategoryFilters(idQuery);
showItems(currentPage);
