import { AxiosInstance } from 'axios';
import { Offer } from '../mocks/offers';
import { SortType } from './reducer';
import { AppDispatch, RootState } from './index';
import { AuthorizationStatus } from '../const';
import { ReviewType } from '../mocks/review';

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

export const setCurrentOffer = (offer: Offer | null) => ({
  type: 'setCurrentOffer' as const,
  payload: offer,
});

export const setNearOffers = (offers: Offer[]) => ({
  type: 'setNearOffers' as const,
  payload: offers,
});

export const setReviews = (reviews: ReviewType[]) => ({
  type: 'setReviews' as const,
  payload: reviews,
});

export const setOfferLoading = (isLoading: boolean) => ({
  type: 'setOfferLoading' as const,
  payload: isLoading,
});

export const setReviewsLoading = (isLoading: boolean) => ({
  type: 'setReviewsLoading' as const,
  payload: isLoading,
});

export const addReview = (review: ReviewType) => ({
  type: 'addReview' as const,
  payload: review,
});

export const fetchOffer = (id: string) =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    dispatch(setOfferLoading(true));
    try {
      const { data: offer } = await api.get<Offer>(`/offers/${id}`);
      const { data: nearOffers } = await api.get<Offer[]>(`/offers/${id}/nearby`);
      dispatch(setCurrentOffer(offer));
      dispatch(setNearOffers(nearOffers));
      dispatch(setOfferLoading(false));
    } catch (error) {
      dispatch(setOfferLoading(false));
      throw error;
    }
  };

export const fetchReviews = (id: string) =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    dispatch(setReviewsLoading(true));
    try {
      const { data } = await api.get<ReviewType[]>(`/comments/${id}`);
      dispatch(setReviews(data));
      dispatch(setReviewsLoading(false));
    } catch (error) {
      dispatch(setReviewsLoading(false));
    }
  };

export const postReview = (id: string, rating: number, comment: string) =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    const { data } = await api.post<ReviewType>(`/comments/${id}`, { rating, comment });
    dispatch(addReview(data));
  };

export const updateOffer = (offer: Offer) => ({
  type: 'updateOffer' as const,
  payload: offer,
});

export const toggleFavorite = (id: string, isCurrentlyFavorite: boolean) =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    const status = isCurrentlyFavorite ? 0 : 1;
    const { data } = await api.post<Offer>(`/favorite/${id}/${status}`);
    dispatch(updateOffer(data));
  };

