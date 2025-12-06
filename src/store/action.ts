import { AxiosInstance } from 'axios';
import { Offer } from '../mocks/offers';
import { SortType } from './reducer';
import { AppDispatch, RootState } from './index';
import { AuthorizationStatus } from '../const';

export type AuthInfo = {
  email: string;
  token: string;
  avatarUrl: string;
  name: string;
  isPro: boolean;
};

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

export const requireAuthorization = (status: AuthorizationStatus) => ({
  type: 'requireAuthorization' as const,
  payload: status,
});

export const setUser = (user: { email: string; avatarUrl: string; name: string; isPro: boolean } | null) => ({
  type: 'setUser' as const,
  payload: user,
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

export const checkAuth = () =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    const token = localStorage.getItem('six-cities-token');
    if (!token) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return;
    }

    try {
      const { data } = await api.get<AuthInfo>('/login');
      localStorage.setItem('six-cities-token', data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({
        email: data.email,
        avatarUrl: data.avatarUrl,
        name: data.name,
        isPro: data.isPro,
      }));
    } catch {
      localStorage.removeItem('six-cities-token');
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  };

export const login = (email: string, password: string) =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    localStorage.setItem('six-cities-token', data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser({
      email: data.email,
      avatarUrl: data.avatarUrl,
      name: data.name,
      isPro: data.isPro,
    }));
  };

export const logout = () => {
  localStorage.removeItem('six-cities-token');
  return requireAuthorization(AuthorizationStatus.NoAuth);
};

