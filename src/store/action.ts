import { Offer } from '../mocks/offers';
import { SortType } from './reducer';

export const changeCity = (city: string) => ({
  type: 'changeCity' as const,
  payload: city,
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'loadOffers' as const,
  payload: offers,
});

export const changeSortType = (sortType: SortType) => ({
  type: 'changeSortType' as const,
  payload: sortType,
});

