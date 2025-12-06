import { Offer } from '../mocks/offers';

export type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
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
    default:
      return state;
  }
}

