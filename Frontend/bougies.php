<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accueil</title>
    <?php require_once('./components/metas.php');?>
    <link rel="stylesheet" href="../assets/css/candles.css">
  </head>
  <body class="body-index">
  <?php require_once('./components/banner.php');?>
  <?php require_once('./components/navbar.php');?>
    <main class="wrapper__shop">
      <h1 class="title__shop">Nos bougies personnalisées <wty>Worthy</<wty></h1><br>
      <div class="wrapper__personal">
        <div class="wrapper__form__candles">
            <div class="container__image">

            </div>
            <div class="container__form">
            <!-- <p>Prix de votre bougie personnalisée <wty>Worthy</wty> : <span id="price_candle"></span></p> -->
            <form action="" id="userChoices">
                    <div class="tab type_wrapper">
                        <div>
                            <h2 class="userChoices__title uc_title1"></h2>
                        </div>
                        <div id="type_container"></div>
                    </div>

                    <div class="tab size_wrapper">
                        <div>
                            <h2 class="userChoices__title uc_title2"></h2>
                        </div>
                        <div id="ml_container"></div>
                    </div>

                    <div class="tab">
                        
                    </div>

                    <div class="tab">

                    </div>

                    <div class="tab">

                    </div>
                    <br>
                    <div class="steps_container">
                        <div class="steps">
                            <span class="step"></span>
                            <span class="step"></span>
                            <span class="step"></span>
                            <span class="step"></span>
                            <span class="step"></span>
                        </div>
                        <div>
                            <button type="button" id="prevBtn" onclick="nextPrev(-1)"><i class="fa fa-arrow-left"></i></button>
                            <button type="button" id="nextBtn" onclick="nextPrev(1)"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </main>
    <div>
      
    </div>
    <?php require_once('./components/scripts.php');?>
    <script src="./assets/js/bougies.js"></script>
  </body>
</html>
