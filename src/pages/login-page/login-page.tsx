import { Navigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { loginAction } from '../../store/api-actions';
import { FormEvent, useRef } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getError } from '../../store/app-process/selectors';

export const LoginPage = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();


  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const error = useAppSelector(getError);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {error && (
              <div
                style={{
                  padding: '5px',
                  marginBottom: '20px',
                  color: '#ff4d4d',
                  backgroundColor: '#ffe6e6',
                  border: '1px solid #ff4d4d',
                  borderRadius: '5px',
                  textAlign: 'center',
                  width: '70%',

                }}
              >
                {error}
              </div>
            )}
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={loginRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  title="Пароль должен содержать хотя бы одну цифру и букву и не должен содержать пробелы"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
