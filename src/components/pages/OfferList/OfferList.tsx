import OfferCard from '../OfferCard/OfferCard';
import { Offer } from '../../../mocks/offers';

type OfferListProps = {
  offers: Offer[];
  variant?: 'cities' | 'near-places' | 'favorites';
  onOfferHover?: (offerId: string | null) => void;
}

export default function OfferList({ offers, variant = 'cities', onOfferHover }: OfferListProps): JSX.Element {
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
          onMouseEnter={() => onOfferHover?.(offer.id)}
          onMouseLeave={() => onOfferHover?.(null)}
        />
      ))}
    </div>
  );
}


