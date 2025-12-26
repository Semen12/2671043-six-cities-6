import { useCallback, useState } from 'react';
import { OfferList } from '../../components/offers-list/offers-list';
import { MapOffers } from '../../components/map-offers/map-offers';
import { PlaceCardType, SortOption } from '../../const';
import { LocationsList } from '../../components/locations-list/locations-list';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { PlacesSorting } from '../../components/places-sorting/places-sorting';

import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { Header } from '../../components/header/header';
import {
  getFilteredOffers,
  getIsOffersDataLoading,
} from '../../store/app-data/selectors';
import { getCity, getSortOption } from '../../store/app-process/selectors';
import { changeCity, changeSort } from '../../store/app-process/app-process';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getFilteredOffers);
  const cityActive = useAppSelector(getCity);
  const currentSortOption = useAppSelector(getSortOption);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  // Вычисляем количество мест динамически
  const placesCount = offers.length;
  const isOffersEmpty = placesCount === 0;

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardHover = useCallback((id: string | null) => {
    setActiveCardId(id);
  }, []);

  const handleCityChange = useCallback(
    (city: string) => {
      dispatch(changeCity(city));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (option: SortOption) => {
      dispatch(changeSort(option));
    },
    [dispatch]
  );

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
                    We could not find any property available at the moment in{' '}
                    {cityActive}
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
                <PlacesSorting
                  currentSort={currentSortOption}
                  onChange={handleSortChange}
                />
                <div className="cities__places-list places__list tabs__content">
                  <OfferList
                    onActiveCard={handleCardHover}
                    offers={offers}
                    cardType={PlaceCardType.Cities}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <MapOffers
                  className="cities__map"
                  selectedOffer={activeCardId}
                  offers={offers}
                  city={offers[0]?.city}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
