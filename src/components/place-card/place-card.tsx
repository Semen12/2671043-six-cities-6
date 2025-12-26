import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus, PlaceCardType } from '../../const';
import { setFavoriteAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  onActiveCard: (id: string | null) => void;
  cardType: PlaceCardType;
};

export const PlaceCard = memo(
  ({ offer, onActiveCard, cardType }: PlaceCardProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorizationStatus = useAppSelector(getAuthorizationStatus);

    const articleClassName = `${cardType}__card`;
    const imgWrapperClassName = `${cardType}__image-wrapper`;

    const imgWidth = cardType === PlaceCardType.Favorites ? 150 : 260;
    const imgHeight = cardType === PlaceCardType.Favorites ? 110 : 200;

    const handleBookmarkClick = () => {
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        navigate(AppRoute.Login);
        return;
      }
      dispatch(
        setFavoriteAction({
          offerId: offer.id,
          status: offer.isFavorite ? 0 : 1,
        })
      );
    };

    const bookmarkButtonClass = `place-card__bookmark-button button ${
      offer.isFavorite ? 'place-card__bookmark-button--active' : ''
    }`;

    return (
      <article
        className={`${articleClassName} place-card`}
        onMouseEnter={() => onActiveCard(offer.id)}
        onMouseLeave={() => onActiveCard(null)}
      >
        {offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}

        <div className={`${imgWrapperClassName} place-card__image-wrapper`}>
          <Link to={`/offer/${offer.id}`}>
            <img
              className="place-card__image"
              src={offer.previewImage}
              width={imgWidth}
              height={imgHeight}
              alt="Place image"
            />
          </Link>
        </div>

        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={bookmarkButtonClass}
              type="button"
              onClick={handleBookmarkClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
              </span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span
                style={{ width: `${Math.round(offer.rating) * 20}%` }}
              >
              </span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    );
  }
);

PlaceCard.displayName = 'PlaceCard';
