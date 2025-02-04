function Page() {
  return (
    <div className="wrapper__login">
      <div className="wrapper__login__container">
        <form method="POST" className="register_user_form">
          <div className="login-logo">
            <img src="../assets/images/logo_worthy_v1.png" alt="" />
            {/* S'inscrire */}
          </div>
          <div className="input__login">
            <label for="email">Votre email</label>
            <input type="email" name="email" required />
          </div>
          <div className="input__login">
            <label for="firstname"> Votre prénom</label>
            <input type="text" name="firstname" required />
          </div>

          <hr />
          <div className="input__login">
            <label for="password">Votre mot-de-passe</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="button__login">
            S'inscrire
          </button>
          <a href="/auth/login" className="button__go_to_login go_login">
            Vous avez déjà un compte ? Connectez-vous
          </a>
          <p className="error_signup"></p>
        </form>
      </div>
    </div>
  );
}

export default Page;
