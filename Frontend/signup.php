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
        <!-- Register Form -->
        <form method="POST" class="register_user_form">
          <div class="login-logo">
            <img src="../assets/images/logo_worthy_v1.png" alt="">
            S'inscrire
          </div>
          <div class="input__login">
            <label for="lastname">Votre nom</label
            ><input type="text" name="lastname" required />
          </div>
          <div class="input__login">
            <label for="email">Votre email</label
            ><input type="email" name="email" required />
          </div>
          <!-- <div class="input__login">
            <label for="firstname"> Votre prénom</label
            ><input type="text" name="firstname" required />
          </div>-->
          
          <hr>
          <div class="input__login">
            <label for="password">Votre mot-de-passe</label>
            <input type="password" name="password" required />
          </div>
          <div class="input__login">
            <label for="verification_password"
              >Répétez votre mot-de-passe</label
            >
            <input type="password" name="verification_password" required />
          </div>
          <button type="submit" class="button__login">S'inscrire</button>
          <a href="./login.php" class="button__go_to_login go_login"
            >Vous avez déjà un compte ? Connectez-vous</a
          >
          <p class="error_signup"></p>
        </form>
      </div>
    </div>

    <script src="./assets/js/signup.js"></script>
  </body>
</html>
