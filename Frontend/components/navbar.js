const currentPage = document.location.pathname;
const pageSplit = currentPage.split('/')[1];

const params = new URLSearchParams(document.location.search);
const getParam = params.get('category');

export function createNavbar() {
  const navbar = document.createElement('nav');
  navbar.innerHTML = `
<div class="container__wrapper__navbar">
<nav class="wrapper__navbar">
    <div class="navbar__block__items">
        <img class="navbar__logo" src="./assets/images/logo_worthy_v1.png" alt="">
        <a href="index.html" class="wrapper__navbar__item ${
          pageSplit === 'index.html' ? 'active_nav' : ''
        }"><i class="fa fa-home"></i> Accueil</a>
        <a href="shop.html?category=Vêtements" class="wrapper__navbar__item ${
          pageSplit === 'shop.html' && getParam === 'Vêtements'
            ? 'active_nav'
            : ''
        }"><i class="fa fa-vest-patches"></i> Vêtements</a>
        <a href="shop.html?category=Bijoux" class="wrapper__navbar__item ${
          pageSplit === 'shop.html' && getParam === 'Bijoux' ? 'active_nav' : ''
        }"><i class="fa fa-gem"></i> Bijoux</a>
        <a href="shop.html?category=Cosmétiques" class="wrapper__navbar__item ${
          pageSplit === 'shop.html' && getParam === 'Cosmétiques'
            ? 'active_nav'
            : ''
        }"><i class="fa fa-spray-can-sparkles"></i> Cosmétiques</a>
        <a href="shop.html?category=Bougies" class="wrapper__navbar__item ${
          pageSplit === 'shop.html' && getParam === 'Bougies'
            ? 'active_nav'
            : ''
        }"><i class="fa fa-fire-flame-simple"></i> Bougies</a>
        
    </div>
    
    <div class="navbar__block__items">
        <a href="#" class="wrapper__navbar__item right-items-nav nav-logout"
          ><i class="fa fa-right-from-bracket"></i> Se déconnecter</a
        >
        <a href="login.html" class="wrapper__navbar__item right-items-nav nav-login"
          ><i class="fa fa-right-to-bracket"></i> Se connecter</a
        >
        <a href="signup.html" class="wrapper__navbar__item right-items-nav nav-signup"
          ><i class="fa fa-user-plus"></i> S'inscrire</a
        >
        <a href="basket.html" class="right-items-nav nav-cart"><i class="fa fa-bag-shopping"><span class="number-items-cart"></span></i></a>
    </div>
    <span class="burger-nav"><i class="fa fa-bars"></i></span>
    </nav>
</div>
`;
  return navbar;
}

export function attachNavbar(target) {
  const navbar = createNavbar();
  target.prepend(navbar);
}
