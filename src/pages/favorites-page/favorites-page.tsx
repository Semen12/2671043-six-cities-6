import { Header } from '../../components/header/header';
import { PlaceCard } from '../../components/place-card/place-card';
import { PlaceCardType } from '../../const';
import { useAppSelector } from '../../hooks/use-store';


export const FavoritesPage = () => {
  const offers = useAppSelector((state) => state.offers);
  // 1. Фильтруем только избранные
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  // 2. Получаем уникальные города
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

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
                    {favoriteOffers
                      .filter((offer) => offer.city.name === cityName)
                      .map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          offer={offer}
                          cardType={PlaceCardType.Favorites} // Переключаем вид карточки
                          onActiveCard={() => {}} // Заглушка, так как здесь нет карты рядом
                        />
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};
