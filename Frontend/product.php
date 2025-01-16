<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page produit - Worthy</title>
    <?php require_once('./components/metas.php');?>
    <link rel="stylesheet" href="./assets/css/product.css">
    <script src="https://js.stripe.com/v3/"></script>
    <script src="./assets/js/product.js" defer></script>
  </head>
  <body class="body-product">
  <?php require_once('./components/banner.php');?>
  <?php require_once('./components/navbar.php');?>

  <aside class="wrapper__order">
    <span class="close__order"><i class="fa fa-xmark"></i> Fermer</span>
    <form id="payment-form" class="form-order">
        <!-- <div class="form-group">
            <label for="cardholder-name">Nom du titulaire</label>
            <input type="text" id="cardholder-name" class="cardholder-name" placeholder="Jean Dupont" required>
        </div>
        <div class="form-group">
            <label for="card-number">Numéro de carte</label>
            <div id="card-number-element"></div>
        </div>
        <div class="form-group">
            <label for="card-expiry">Date d'expiration</label>
            <div id="card-expiry-element"></div>
        </div>
        <div class="form-group">
            <label for="card-cvc">Code CVC</label>
            <div id="card-cvc-element"></div>
        </div>
        <button id="submit-button" class="submit-button" type="submit">Payer</button> -->
        <div id="payment-element"></div>
        <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Acheter</span>
        </button>
        <div id="payment-message" class="hidden"></div>
    </form>
</aside>

    <main class="wrapper__shop">
      <!--  -->
      <div class="skeleton__wrapper">
        <div class="skeleton_1"></div>
        <div class="skeleton_2">
          <span></span>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <span></span>
          <ww></ww>
        </div>
      </div>
      <!--  -->
      <div class="wrapper__single__product">
        <!--  -->
        <div class="wrapper__product__images">
          <div class="single__product__image" id="productimage">
            <!-- <img src="./assets/images/{%PRODUCTIMAGE%}" alt=""/> -->
          </div>
          <div class="multiple__product__images" id="multimages">
          </div>
        </div>

        <!--  -->
        <div class="wrapper__product__infos">
          <!-- <h1 class="title__shop">{%PRODUCTNAME%}</h1> -->
          <h1 class="title__shop"></h1>
          <div>
            <span class="reducted__price"></span>
            <span class="actual__price"></span>
          </div>
          <div id="filterItem">
          </div>
          <hr>
          <p class="description__product"></p>
          <div class="wrapper__basket_and_buy__buttons">
            
          </div>
        </div>
      </div>
    </main>
    <?php require_once('./components/footer.php')?>
    <?php require_once('./components/scripts.php');?>
  </body>
</html>
