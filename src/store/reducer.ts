import { Offer } from '../mocks/offers';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type State = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  isLoading: false,
  error: null,
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
    default:
      return state;
  }
}

