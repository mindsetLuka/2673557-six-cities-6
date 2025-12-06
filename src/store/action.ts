import { AxiosInstance } from 'axios';
import { Offer } from '../mocks/offers';
import { SortType } from './reducer';
import { AppDispatch, RootState } from './index';

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

export const setLoading = (isLoading: boolean) => ({
  type: 'setLoading' as const,
  payload: isLoading,
});

export const setError = (error: string | null) => ({
  type: 'setError' as const,
  payload: error,
});

export const fetchOffers = () =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(loadOffers(data));
    } catch (error) {
      dispatch(setError('Failed to load offers. Please try again later.'));
    }
  };

