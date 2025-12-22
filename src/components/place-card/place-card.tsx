import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { PlaceCardType } from '../../const';

type PlaceCardProps = {
  offer: Offer;
  onActiveCard: (id: string | null) => void;
  cardType: PlaceCardType;
};

export const PlaceCard = ({ offer, onActiveCard, cardType }: PlaceCardProps) => {


  // 1. Класс для самого тега article
  const articleClassName = `${cardType}__card`;

  // 2. Класс для обертки картинки
  const imgWrapperClassName = `${cardType}__image-wrapper` ;


  // 3. Размеры картинки
  const imgWidth = cardType === PlaceCardType.Favorites ? 150 : 260;
  const imgHeight = cardType === PlaceCardType.Favorites ? 110 : 200;


  return (
    <article className={`${articleClassName} place-card`} onMouseEnter={() => onActiveCard(offer.id)} onMouseLeave={() => onActiveCard(null)} >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      {/* Используем вычисленный класс обертки */}
      <div className={`${imgWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`} >
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imgWidth} // Используем переменную
            height={imgHeight} // Используем переменную
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
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
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
};
