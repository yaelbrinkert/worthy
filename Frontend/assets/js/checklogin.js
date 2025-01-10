const linkBack = 'http://localhost:9876/api';
const spanNumberItemsWrapper = document.querySelector('.number-items-cart');

// Cache pour l'authentification
let authCache = {
  isAuthenticated: null,
  user: null,
  timestamp: 0,
};
const AUTH_CACHE_DURATION = 240000; // 1 minute en millisecondes

// Vérifie si le cache est valide
function isAuthCacheValid() {
  return Date.now() - authCache.timestamp < AUTH_CACHE_DURATION;
}

async function checkUserAuthentication() {
  if (isAuthCacheValid()) {
    return authCache.isAuthenticated;
  }
  try {
    // Essaye de vérifier le token en envoyant une requête au backend
    const response = await fetch(linkBack + '/auth/status/', {
      method: 'GET',
      credentials: 'include', // Permet d'envoyer les cookies
    });

    if (!response.ok) throw new Error('Utilisateur non authentifié');

    const data = await response.json();
    authCache = {
      isAuthenticated: data.isAuthenticated,
      user: data.isAuthenticated ? data.user : null,
      timestamp: Date.now(),
    };

    if (data.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(data.user));
      showAuthenticatedNav(data.user); // Affiche la barre de navigation pour un utilisateur connecté
      return true;
    } else {
      localStorage.removeItem('user');
      showUnauthenticatedNav(); // Affiche la barre de navigation pour un utilisateur non connecté
      return false;
    }
  } catch (error) {
    authCache = { isAuthenticated: false, user: null, timestamp: Date.now() };
    console.error("Impossible d'authentifier:", error);
    localStorage.removeItem('user');
    showUnauthenticatedNav(); // En cas d'erreur, on suppose que l'utilisateur n'est pas connecté
    return false;
  }
}

function showAuthenticatedNav(user) {
  document.querySelector('.nav-login').style.display = 'none';
  document.querySelector('.nav-signup').style.display = 'none';
  // document.querySelector(".nav-cart").style.display = "block";
  document.querySelector('.nav-logout').style.display = 'block';
}

function showUnauthenticatedNav() {
  document.querySelector('.nav-login').style.display = 'block';
  document.querySelector('.nav-signup').style.display = 'block';
  // document.querySelector(".nav-cart").style.display = "none";
  document.querySelector('.nav-logout').style.display = 'none';
}

const buttonLogout =
  // Appel au chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    checkUserAuthentication();
  });

let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function addToCart(itemId, quantity) {
  const isAuthenticated = await checkUserAuthentication();

  if (isAuthenticated) {
    try {
      fetch(`${linkBack}/users/cart/${itemId}/${quantity}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      }).then(() => {
        showNumberOfItemsInCart();
      });
    } catch (err) {
      console.error('Erreur:', err);
    }
  } else {
    const existingItem = cart.find((item) => item.itemId === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
      showNumberOfItemsInCart();
    } else {
      cart.push({ itemId: itemId, quantity: quantity });
      showNumberOfItemsInCart();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

async function removeFromCart(itemId) {
  const isAuthenticated = await checkUserAuthentication();
  if (isAuthenticated) {
    try {
      fetch(`${linkBack}/users/cart/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      }).then(() => {
        showItemsInCart();
        showNumberOfItemsInCart();
      });
    } catch (err) {
      console.error('Erreur', err);
    }
  } else if (!isAuthenticated) {
    const findItem = cart.findIndex((item) => item.itemId === itemId);
    cart.splice(findItem, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showItemsInCart();
    showNumberOfItemsInCart();
  }
}

async function getCartFromAuthenticated() {
  try {
    const response = await fetch(`${linkBack}/users/cart`, {
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

async function addOneItemFromCart(itemId) {
  const isAuthenticated = await checkUserAuthentication();
  if (isAuthenticated) {
    try {
      fetch(`${linkBack}/users/cart/add/${itemId}`, {
        method: 'PATCH',
        credentials: 'include',
      }).then(() => {
        showItemsInCart();
        showNumberOfItemsInCart();
      });
    } catch (err) {
      console.error('Erreur', err);
    }
  } else if (!isAuthenticated) {
    const findItem = cart.find((item) => item.itemId === itemId);
    if (findItem) findItem.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    showItemsInCart();
    showNumberOfItemsInCart();
  }
}

async function removeOneItemFromCart(itemId) {
  const isAuthenticated = await checkUserAuthentication();
  if (isAuthenticated) {
    try {
      fetch(`${linkBack}/users/cart/remove/${itemId}`, {
        method: 'PATCH',
        credentials: 'include',
      }).then(() => {
        showItemsInCart();
        showNumberOfItemsInCart();
      });
    } catch (err) {
      console.error('Erreur', err);
    }
  } else if (!isAuthenticated) {
    const findItem = cart.find((item) => item.itemId === itemId);

    if (findItem) {
      findItem.quantity--; // Décrémente la quantité

      if (findItem.quantity === 0) {
        // Si la quantité est 0, supprime l'élément du panier
        const findIndex = cart.findIndex((item) => item.itemId === itemId);
        if (findIndex !== -1) {
          cart.splice(findIndex, 1); // Supprime l'élément
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showItemsInCart();
    showNumberOfItemsInCart();
  }
}

async function showNumberOfItemsInCart() {
  const isAuthenticated = await checkUserAuthentication();
  if (isAuthenticated) {
    const cartFromAuthenticated = await getCartFromAuthenticated();
    if (cartFromAuthenticated) {
      let numberOfItemsInTheCart = 0;
      cartFromAuthenticated.forEach((num) => {
        const numberForOneItem = num.quantity;
        numberOfItemsInTheCart += numberForOneItem;
      });
      spanNumberItemsWrapper.style.display = 'flex';
      spanNumberItemsWrapper.innerHTML = `${numberOfItemsInTheCart}`;
    } else {
      spanNumberItemsWrapper.style.display = 'none';
    }
  } else if (!isAuthenticated) {
    const arrayCart = localStorage.getItem('cart');
    const obj = JSON.parse(arrayCart);
    if (obj.length > 0) {
      spanNumberItemsWrapper.style.display = 'flex';
      let numberItemToDisplay = 0;
      obj.forEach((num) => {
        const numberForOneItem = num.quantity;
        numberItemToDisplay += numberForOneItem;
      });
      spanNumberItemsWrapper.innerHTML = `${numberItemToDisplay}`;
    } else if (obj.length <= 0) {
      spanNumberItemsWrapper.style.display = 'none';
    }
  }
}

showNumberOfItemsInCart();
