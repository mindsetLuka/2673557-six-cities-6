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
  switch (action.type) {
    case 'changeCity':
      return {
        ...state,
        city: action.payload as string,
      };
    case 'loadOffers':
      return {
        ...state,
        offers: action.payload as Offer[],
        isLoading: false,
        error: null,
      };
    case 'changeSortType':
      return {
        ...state,
        sortType: action.payload as SortType,
      };
    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case 'setError':
      return {
        ...state,
        error: action.payload as string | null,
        isLoading: false,
      };
    case 'requireAuthorization':
      return {
        ...state,
        authorizationStatus: action.payload as AuthorizationStatus,
      };
    case 'setUser':
      return {
        ...state,
        user: action.payload as State['user'],
      };
    case 'setCurrentOffer':
      return {
        ...state,
        currentOffer: action.payload as Offer | null,
      };
    case 'setNearOffers':
      return {
        ...state,
        nearOffers: action.payload as Offer[],
      };
    case 'setReviews':
      return {
        ...state,
        reviews: action.payload as ReviewType[],
      };
    case 'setOfferLoading':
      return {
        ...state,
        isOfferLoading: action.payload as boolean,
      };
    case 'setReviewsLoading':
      return {
        ...state,
        isReviewsLoading: action.payload as boolean,
      };
    case 'addReview':
      return {
        ...state,
        reviews: [action.payload as ReviewType, ...state.reviews],
      };
    default:
      return state;
  }
}

