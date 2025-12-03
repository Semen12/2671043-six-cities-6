import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="page page--gray page--login">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">404. Page not found</h1>

          <img className="login__image" src="img/404.png" alt="404" />

          <Link to="/">Вернуться на главную</Link>
        </section>
      </div>
    </main>
  </div>
);
