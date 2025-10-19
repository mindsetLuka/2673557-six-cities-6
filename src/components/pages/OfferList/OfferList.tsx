import { useState } from 'react';
import OfferCard from '../OfferCard/OfferCard';
import { Offer } from '../../../mocks/offers';

type OfferListProps = {
  offers: Offer[];
  variant?: 'cities' | 'near-places' | 'favorites';
}

export default function OfferList({ offers, variant = 'cities' }: OfferListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

  const getListClass = (variantType: string) => {
    switch (variantType) {
      case 'favorites':
        return 'favorites__places';
      case 'near-places':
        return 'near-places__list places__list';
      default:
        return 'cities__places-list places__list tabs__content';
    }
  };

  const listClass = getListClass(variant);

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={(id) => setActiveOfferId(id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}


