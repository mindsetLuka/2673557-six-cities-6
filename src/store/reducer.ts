import { Offer } from '../mocks/offers';
import { AuthorizationStatus } from '../const';
import { ReviewType } from '../mocks/review';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type State = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  user: {
    email: string;
    avatarUrl: string;
    name: string;
    isPro: boolean;
  } | null;
  currentOffer: Offer | null;
  nearOffers: Offer[];
  reviews: ReviewType[];
  isOfferLoading: boolean;
  isReviewsLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: null,
  currentOffer: null,
  nearOffers: [],
  reviews: [],
  isOfferLoading: false,
  isReviewsLoading: false,
};

export function reducer(state: State = initialState, action: { type: string; payload?: unknown }): State {
  const uiReducer = (s: State, a: { type: string; payload?: unknown }) => {
    switch (a.type) {
      case 'changeCity':
        return { ...s, city: a.payload as string } as State;
      case 'changeSortType':
        return { ...s, sortType: a.payload as SortType } as State;
      case 'setLoading':
        return { ...s, isLoading: a.payload as boolean } as State;
      case 'setError':
        return { ...s, error: a.payload as string | null, isLoading: false } as State;
      default:
        return s;
    }
  };

  const userReducer = (s: State, a: { type: string; payload?: unknown }) => {
    switch (a.type) {
      case 'requireAuthorization':
        return { ...s, authorizationStatus: a.payload as AuthorizationStatus } as State;
      case 'setUser':
        return { ...s, user: a.payload as State['user'] } as State;
      default:
        return s;
    }
  };

  const offersReducer = (s: State, a: { type: string; payload?: unknown }) => {
    switch (a.type) {
      case 'loadOffers':
        return { ...s, offers: a.payload as Offer[], isLoading: false, error: null } as State;
      case 'setCurrentOffer':
        return { ...s, currentOffer: a.payload as Offer | null } as State;
      case 'setNearOffers':
        return { ...s, nearOffers: a.payload as Offer[] } as State;
      case 'setReviews':
        return { ...s, reviews: a.payload as ReviewType[] } as State;
      case 'setOfferLoading':
        return { ...s, isOfferLoading: a.payload as boolean } as State;
      case 'setReviewsLoading':
        return { ...s, isReviewsLoading: a.payload as boolean } as State;
      case 'addReview':
        return { ...s, reviews: [a.payload as ReviewType, ...s.reviews] } as State;
      case 'updateOffer': {
        const updated = a.payload as Offer;
        return {
          ...s,
          offers: s.offers.map((o) => o.id === updated.id ? updated : o),
          currentOffer: s.currentOffer && s.currentOffer.id === updated.id ? updated : s.currentOffer,
          nearOffers: s.nearOffers.map((o) => o.id === updated.id ? updated : o),
        } as State;
      }
      default:
        return s;
    }
  };

  const afterUi = uiReducer(state, action);
  const afterUser = userReducer(afterUi, action);
  const afterOffers = offersReducer(afterUser, action);

  return afterOffers;
}
