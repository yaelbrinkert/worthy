<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accueil</title>
    <?php require_once('./components/metas.php');?>
    <link rel="stylesheet" href="./assets/css/product.css">
  </head>
  <body class="body-product">
  <?php require_once('./components/banner.php');?>
  <?php require_once('./components/navbar.php');?>
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
    <?php require_once('./components/scripts.php');?>
    <script src="./assets/js/product.js"></script>
  </body>
</html>
