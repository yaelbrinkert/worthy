<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accueil</title>
    <?php require_once('./components/metas.php');?>
  </head>
  <body class="body-index">
  <?php require_once('./components/banner.php');?>
  <?php require_once('./components/navbar.php');?>
    <main class="wrapper__shop">
      <h1 class="title__shop">Tous nos produits <wty>Worthy</<wty></h1><br>
      <div class="wrapper__filters__items">
        <div class="wrapper__filters__filter">
          <p class="filter__title"><b>Filtres</b></p>
          <label>
            <input type="checkbox" value="true" class="filter-promos">
            Promotions
          </label>
          <br>
          <!-- <p><b>Genre</b></p>
          <label>
            <input class="filter-sex" type="checkbox" value="m">
            Homme
          </label>
          <label>
            <input class="filter-sex" type="checkbox" value="w">
            Femme
          </label>
          <br> -->

        </div>
      <ul class="cards shop_items_wrapper">
        <!-- Loader Wrapper Skeleton -->
        <ul class="cards loader__skeleton__wrapper shop_items_wrapper">
          <li class="cards_item">
            <div class="card">
              <div class="card_image">
                <div class="skeleton_image"></div>
              </div>
              <div class="card_content">
                <h2 class="card_title_skeleton"></h2>
                <p class="card_text_skeleton price_text"></p>
                <div class="card_buttons">
                  <a href="" class="card_btn_skeleton"></a>
                </div>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_image">
                <div class="skeleton_image"></div>
              </div>
              <div class="card_content">
                <h2 class="card_title_skeleton"></h2>
                <p class="card_text_skeleton price_text"></p>
                <div class="card_buttons">
                  <a href="" class="card_btn_skeleton"></a>
                </div>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_image">
                <div class="skeleton_image"></div>
              </div>
              <div class="card_content">
                <h2 class="card_title_skeleton"></h2>
                <p class="card_text_skeleton price_text"></p>
                <div class="card_buttons">
                  <a href="" class="card_btn_skeleton"></a>
                </div>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_image">
                <div class="skeleton_image"></div>
              </div>
              <div class="card_content">
                <h2 class="card_title_skeleton"></h2>
                <p class="card_text_skeleton price_text"></p>
                <div class="card_buttons">
                  <a href="" class="card_btn_skeleton"></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- Loader Wrapper Skeleton -->
      </ul>
      </div>
      <div class="pagination__wrapper">
        <span class="btn-previous"><i class="fa fa-chevron-left"></i></span>
        <span class="page_number_wrapper"></span>
        <span class="btn-next"><i class="fa fa-chevron-right"></i></span>
      </div>
    </main>
    <?php require_once('./components/footer.php')?>
    <?php require_once('./components/scripts.php');?>
    <script src="./assets/js/shop.js"></script>
  </body>
</html>
