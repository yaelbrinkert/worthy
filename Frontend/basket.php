<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mon Panier - Worthy</title>
    <link rel="stylesheet" href="./assets/css/basket.css">
    <?php require_once('./components/metas.php');?>
  </head>
  <body class="body-index">
  <?php require_once('./components/banner.php');?>
  <?php require_once('./components/navbar.php');?>
    <main class="wrapper__shop">
      <h1 class="title__shop">Votre panier <wty>Worthy</<wty></h1><br>
      <div class="wrapper__cart">
        <div class="wrapper__cart__items">
          <div class="wrapper__cart__items-item-first">
            <div><b>Image</b></div>
            <div><b>Produit</b></div>
            <div><b>Quantité</b></div>
            <div><b>Prix</b></div>
            <div></div>
          </div>
        </div>
        <div class="wrapper__cart__payment">
            
        </div>
      </div>
    </main>
    <?php require_once('./components/scripts.php');?>
    <script src="./assets/js/basket.js"></script>
  </body>
</html>
