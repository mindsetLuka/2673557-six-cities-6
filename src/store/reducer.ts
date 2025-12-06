import { Offer } from '../mocks/offers';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type State = {
  city: string;
  offers: Offer[];
  sortType: SortType;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
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
      };
    case 'changeSortType':
      return {
        ...state,
        sortType: action.payload as SortType,
      };
    default:
      return state;
  }
}

