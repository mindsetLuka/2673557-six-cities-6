import { Offer } from '../mocks/offers';

export const changeCity = (city: string) => ({
  type: 'changeCity' as const,
  payload: city,
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'loadOffers' as const,
  payload: offers,
});

