import { useState } from 'react';
import { OfferList } from '../../components/offers-list/offers-list';
import { MapOffers } from '../../components/map-offers/map-offers';
import { PlaceCardType } from '../../const';
import { LocationsList } from '../../components/locations-list/locations-list';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { changeCity, changeSort } from '../../store/action';
import { PlacesSorting } from '../../components/places-sorting/places-sorting';
import { sortOffers } from '../../utils/offers';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { Header } from '../../components/header/header';


export const MainPage = () => {
  const offers = useAppSelector((state) => state.offers);
  const cityActive = useAppSelector((state) => state.cityActive);
  const currentSortOption = useAppSelector((state) => state.currentSortOption);

  const dispatch = useAppDispatch();

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  const currentOffers = offers.filter(
    (offer) => offer.city.name === cityActive
  );

  const sortedOffers = sortOffers(currentOffers, currentSortOption);

  // Вычисляем количество мест динамически
  const placesCount = sortedOffers.length;
  const isOffersEmpty = placesCount === 0;

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardHover = (id: string | null) => {
    setActiveCardId(id);
  };

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

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
                <PlacesSorting currentSort={currentSortOption} onChange={(option)=>dispatch(changeSort(option))}/>
                <div className="cities__places-list places__list tabs__content">
                  <OfferList
                    onActiveCard={handleCardHover}
                    offers={sortedOffers}
                    cardType={PlaceCardType.Cities}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <MapOffers
                  className="cities__map"
                  selectedOffer={activeCardId}
                  offers={sortedOffers}
                  city={sortedOffers[0]?.city}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
