import { memo } from 'react';
import { PlaceCardType } from '../../const';
import { Offer } from '../../types/offer';
import { PlaceCard } from '../place-card/place-card';

type OfferListProp = {
  offers: Offer[];
  onActiveCard: (id: string | null) => void;
  cardType: PlaceCardType;
};

export const OfferList = memo(
  ({ offers, onActiveCard, cardType }: OfferListProp) => (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onActiveCard={onActiveCard}
          cardType={cardType}
        />
      ))}
    </>
  )
);

OfferList.displayName = 'OfferList';

