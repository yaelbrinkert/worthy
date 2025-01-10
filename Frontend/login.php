<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Se connecter - S'inscrire</title>
    <link rel="stylesheet" href="./assets/css/main.css" />
  </head>
  <body class="body-login">
    
    <div class="wrapper__login">
      <div class="wrapper__login__container">
        <!-- Login Form -->
        <form method="POST" class="login_user_form show__form">
          <div class="login-logo">
            <img src="../assets/images/logo_worthy_v1.png" alt="">
            Se connecter
          </div>
          <!-- <p class="title__login">Se connecter</p> -->
          <div class="input__login">
            <label for="email">Votre email</label>
            <input type="email" name="email" required />
          </div>
          <div class="input__login">
            <label for="email">Votre mot-de-passe</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" class="button__login">Se connecter</button>
          <a href="./signup.php" class="button__go_to_login go_register"
            >Vous n'avez pas de compte ? Inscrivez-vous</a
          >
        </form>
      </div>
    </div>

    <script src="./assets/js/login.js"></script>
  </body>
</html>
