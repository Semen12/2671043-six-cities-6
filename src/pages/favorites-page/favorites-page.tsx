import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { PlaceCard } from '../../components/place-card/place-card';
import { AppRoute, PlaceCardType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavorites } from '../../store/app-data/selectors';
import { Footer } from '../../components/footer/footer';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(getFavorites);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (favorites.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      </div>
    );
  }

  const cities = Array.from(new Set(favorites.map((offer) => offer.city.name)));

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((cityName) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favorites
                      .filter((offer) => offer.city.name === cityName)
                      .map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          offer={offer}
                          cardType={PlaceCardType.Favorites}
                          onActiveCard={() => {}}
                        />
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
