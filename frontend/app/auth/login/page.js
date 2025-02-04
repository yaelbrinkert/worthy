function Page() {
  return (
    <div className="wrapper__login">
      <div className="wrapper__login__container">
        <form method="POST" className="login_user_form show__form">
          <div className="login-logo">
            <img src="../assets/images/logo_worthy_v1.png" alt="" />
            {/* Se connecter */}
          </div>
          <div className="input__login">
            <label for="email">Votre email</label>
            <input type="email" name="email" required />
          </div>
          <div className="input__login">
            <label for="email">Votre mot-de-passe</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="button__login">
            Se connecter
          </button>
          <a href="/auth/signup" className="button__go_to_login go_register">
            Vous n'avez pas de compte ? Inscrivez-vous
          </a>
        </form>
      </div>
    </div>
  );
}

export default Page;
