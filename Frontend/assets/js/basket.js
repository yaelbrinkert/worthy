const url = 'http://localhost:9876/api';
const panier = document.querySelector('.wrapper__cart__items');

async function getItemFromId(itemId) {
  try {
    const response = await fetch(`${url}/items/getspecificitem/${itemId}`);
    if (!response.ok) {
      throw new Error('Response status' + response.status);
    }
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function getImagesFromItemId(itemId) {
  try {
    const response = await fetch(
      `${url}/items/getimagesspecificitem/${itemId}`
    );
    if (!response.ok) {
      throw new Error('Response status' + response.status);
    }
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function getCartFromAuthenticated() {
  try {
    const response = await fetch(`${url}/users/cart`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Response status' + response.status);
    }
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function createCardCart(idOfItem, quantity) {
  const cartDatas = await getItemFromId(idOfItem);
  const imagesCartDatas = await getImagesFromItemId(idOfItem);
  const priceTotal = cartDatas.price * quantity;

  //   const button_remove_item = document.querySelector('#remove-item-button');

  const wrapperItemCart = document.createElement('div');
  wrapperItemCart.className = 'wrapper__cart__items-item';
  wrapperItemCart.innerHTML = `
      <div><img src="./assets/images/${imagesCartDatas[0].url_image}" height="60"></div>
      <div>${cartDatas.name}</div>
      <div><span class="remove-btn remove-one" onClick='removeOneItemFromCart("${idOfItem}")'> - </span> <span class="quantity">${quantity}</span> <span class="remove-btn add-one" onClick='addOneItemFromCart("${idOfItem}")'> + </span></div>
      <div>${priceTotal}€</div>
      <div><span class="delete_from_cart" onClick='removeFromCart("${idOfItem}")'><i class="fa fa-xmark"></i></span></div>
      `;
  panier.appendChild(wrapperItemCart);
}

async function showItemsInCart() {
  const isAuthenticated = await checkUserAuthentication();
  if (isAuthenticated) {
    const cartFromAuthenticated = await getCartFromAuthenticated();
    if (cartFromAuthenticated.length > 0) {
      cartFromAuthenticated.forEach((c) => {
        panier.innerHTML = '';
        createCardCart(c.id_item, c.quantity);
      });
    } else {
      panier.innerHTML = "Vous n'avez aucun produit dans votre panier";
      showNumberOfItemsInCart();
    }
    showNumberOfItemsInCart();
  } else if (!isAuthenticated) {
    const arrayCart = localStorage.getItem('cart');
    const obj = JSON.parse(arrayCart);

    if (obj.length > 0) {
      obj.forEach(async (element) => {
        panier.innerHTML = '';
        createCardCart(element.itemId, element.quantity);
        showNumberOfItemsInCart();
      });
    } else {
      panier.innerHTML = "Vous n'avez aucun produit dans votre panier";
      showNumberOfItemsInCart();
    }
  }
}

showItemsInCart();
