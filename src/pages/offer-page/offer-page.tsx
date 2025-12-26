import { useCallback, useEffect, useMemo, useState } from 'react';
import { CommentForm } from '../../components/comment-form/comment-form';
import { MapOffers } from '../../components/map-offers/map-offers';
import { OfferList } from '../../components/offers-list/offers-list';
import { ReviewList } from '../../components/review-list/review-list';

import { AuthorizationStatus, PlaceCardType } from '../../const';
import { Header } from '../../components/header/header';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { fetchOfferDataAction } from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { NotFoundPage } from '../not-found-page/not-found-page';
import {
  getComments,
  getErrorStatus,
  getIsOffersDataLoading,
  getNearbyOffers,
  getOffer,
} from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';

export const OfferPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getComments);
  const isOfferLoading = useAppSelector(getIsOffersDataLoading);
  const hasError = useAppSelector(getErrorStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const visibleImages = useMemo(
    () => offer?.images.slice(0, 6),
    [offer?.images]
  );

  const visibleNearby = useMemo(() => nearbyOffers.slice(0, 3), [nearbyOffers]);

  const mapOffers = useMemo(
    () => [...visibleNearby, { ...offer, previewImage: '' } as Offer],
    [visibleNearby, offer]
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDataAction(id));
    }
  }, [id, dispatch]);

  const handleCardHover = useCallback((hoveredId: string | null) => {
    setActiveCardId(hoveredId);
  }, []);


  if (hasError) {
    return <NotFoundPage />;
  }


  if (isOfferLoading || !offer) {
    return <LoadingScreen />;
  }

  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {visibleImages?.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${Math.round(offer.rating) * 20}%` }}
                  ></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${
                      offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>

                {/* Список отзывов с реальными данными */}
                <ReviewList reviews={sortedReviews} />

                {/* Форма только для авторизованных */}
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <CommentForm offerId={offer.id} />
                )}
              </section>
            </div>
          </div>
          <MapOffers
            city={offer.city}
            offers={mapOffers}
            selectedOffer={activeCardId || offer.id}
            className="offer__map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OfferList
                offers={visibleNearby}
                cardType={PlaceCardType.NearPlaces}
                onActiveCard={handleCardHover}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
