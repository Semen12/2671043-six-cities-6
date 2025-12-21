import { useState } from 'react';
import { OfferList } from '../../components/offers-list/offers-list';
import { MapOffers } from '../../components/map-offers/map-offers';
import { PlaceCardType } from '../../const';
import { LocationsList } from '../../components/locations-list/locations-list';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { changeCity } from '../../store/action';

export const MainPage = () => {
  const offers = useAppSelector((state) => state.offers);
  const cityActive = useAppSelector((state) => state.cityActive);

  const dispatch = useAppDispatch();

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  const currentOffers = offers.filter(
    (offer) => offer.city.name === cityActive
  );

  // Вычисляем количество мест динамически
  const placesCount = currentOffers.length;
  const isOffersEmpty = placesCount === 0;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardHover = (id: number | null) => {
    setActiveCardId(id);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <LocationsList
            cityActive={cityActive}
            onCityChange={handleCityChange}
          />
        </div>
        <div className="cities">
          {isOffersEmpty ? (
          /* Сценарий 1: Предложений нет */
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                                We could not find any property available at the moment in {cityActive}
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {placesCount} places to stay in {cityActive}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                    Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <OfferList
                    onActiveCard={handleCardHover}
                    offers={currentOffers}
                    cardType={PlaceCardType.Cities}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <MapOffers
                  className="cities__map"
                  selectedOffer={activeCardId}
                  offers={currentOffers}
                  city={currentOffers[0]?.city}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
