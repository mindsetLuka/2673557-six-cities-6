import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectData = (state: RootState) => state.data;

export const selectCity = createSelector(selectData, (data) => data.city);
export const selectAllOffers = createSelector(selectData, (data) => data.offers);
export const selectSortType = createSelector(selectData, (data) => data.sortType);
export const selectIsLoading = createSelector(selectData, (data) => data.isLoading);
export const selectError = createSelector(selectData, (data) => data.error);
export const selectAuthorizationStatus = createSelector(selectData, (data) => data.authorizationStatus);
export const selectUser = createSelector(selectData, (data) => data.user);

export const selectFilteredAndSortedOffers = createSelector(
  [selectAllOffers, selectCity, selectSortType],
  (offers, city, sortType) => {
    const filtered = offers.filter((offer) => offer.city.name === city);
    const sorted = [...filtered];
    switch (sortType) {
      case 'Price: low to high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price: high to low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Top rated first':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'Popular':
      default:
        break;
    }

    return sorted;
  }
);

export const selectFavoriteCount = createSelector(selectAllOffers, (offers) => offers.filter((o) => o.isFavorite).length);

export const selectCurrentOffer = createSelector(selectData, (data) => data.currentOffer);
export const selectNearOffers = createSelector(selectData, (data) => data.nearOffers);
export const selectReviews = createSelector(selectData, (data) => data.reviews);
export const selectIsOfferLoading = createSelector(selectData, (data) => data.isOfferLoading);
export const selectIsReviewsLoading = createSelector(selectData, (data) => data.isReviewsLoading);
