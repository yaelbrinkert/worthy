<?php 
$current_page = basename($_SERVER['PHP_SELF'], ".php");
if(isset($_GET['category'])) {
  $current_cat = $_GET['category'];
}
?>
<div class="container__wrapper__navbar">
<nav class="wrapper__navbar">
    <div class="navbar__block__items">
        <img class="navbar__logo" src="./assets/images/logo_worthy_v1.png" alt="">
        <a href="index.php" class="wrapper__navbar__item <?php echo ($current_page == "index") ? 'active_nav' : ''; ?>"><i class="fa fa-home"></i> Accueil</a>
        <a href="shop.php?category=Vêtements" class="wrapper__navbar__item <?php echo ($current_page == "shop" && $current_cat == "Vêtements") ? 'active_nav' : ''; ?>"><i class="fa fa-vest-patches"></i> Vêtements</a>
        <a href="shop.php?category=Bijoux" class="wrapper__navbar__item <?php echo ($current_page == "shop" && $current_cat == "Bijoux") ? 'active_nav' : ''; ?>"><i class="fa fa-gem"></i> Bijoux</a>
        <a href="shop.php?category=Cosmétiques" class="wrapper__navbar__item <?php echo ($current_page == "shop" && $current_cat == "Cosmétiques") ? 'active_nav' : ''; ?>"><i class="fa fa-spray-can-sparkles"></i> Cosmétiques</a>
        <a href="shop.php?category=Bougies" class="wrapper__navbar__item <?php echo ($current_page == "shop" && $current_cat == "Bougies") ? 'active_nav' : ''; ?>"><i class="fa fa-fire-flame-simple"></i> Bougies</a>
        
    </div>
    <!-- <div class="navbar__block__items">
        <a href="index.php" class="wrapper__navbar__item <?php echo ($current_page == "index") ? 'active_nav' : ''; ?>"><i class="fa fa-home"></i> Accueil</a>
        <a href="shop.php" class="wrapper__navbar__item <?php echo ($current_page == "shop" OR $current_page == "jewelry" OR $current_page == "cosmetics" OR $current_page == "clothes") ? 'active_nav' : ''; ?>"><i class="fa fa-bag-shopping"></i> Boutique</a>
    </div> -->
    
    <div class="navbar__block__items">
        <a href="#" class="wrapper__navbar__item nav-logout"
          ><i class="fa fa-right-from-bracket"></i> Se déconnecter</a
        >
        <a href="login.php" class="wrapper__navbar__item nav-login"
          ><i class="fa fa-right-to-bracket"></i> Se connecter</a
        >
        <a href="signup.php" class="wrapper__navbar__item nav-signup"
          ><i class="fa fa-user-plus"></i> S'inscrire</a
        >
        <a href="basket.php" class=" nav-cart"><i class="fa fa-bag-shopping"><span class="number-items-cart"></span></i></a>
    </div>
        <!-- <a href="cart.php" class="wrapper__navbar__item nav-cart">
          <i class="fa fa-shopping-cart"></i>
          <span class="number-items-cart"></span
        ></a> -->
    </nav>
</div>
