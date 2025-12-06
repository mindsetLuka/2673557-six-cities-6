import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import OfferList from '../OfferList/OfferList';
import Map from '../../Map/Map';
import CityList from '../../CityList/CityList';
import SortOptions from '../../SortOptions/SortOptions';
import Spinner from '../../Spinner/Spinner';
import { RootState } from '../../../store';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { logout, setUser } from '../../../store/action';

export function MainScreen(): JSX.Element {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.data.city);
  const allOffers = useSelector((state: RootState) => state.data.offers);
  const sortType = useSelector((state: RootState) => state.data.sortType);
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const error = useSelector((state: RootState) => state.data.error);
  const authorizationStatus = useSelector((state: RootState) => state.data.authorizationStatus);
  const user = useSelector((state: RootState) => state.data.user);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser(null));
  };

  const filteredOffers = useMemo(() => {
    const filtered = allOffers.filter((offer) => offer.city.name === city);

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
  }, [allOffers, city, sortType]);

  const favoriteCount = useMemo(() => allOffers.filter((offer) => offer.isFavorite).length, [allOffers]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={user.avatarUrl} alt={user.name} style={{ borderRadius: '50%' }} />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        {favoriteCount > 0 && (
                          <span className="header__favorite-count">{favoriteCount}</span>
                        )}
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        <div className="cities">
          {(() => {
            if (isLoading) {
              return (
                <div className="cities__places-container container">
                  <Spinner />
                </div>
              );
            }

            if (error) {
              return (
                <div className="cities__places-container cities__places-container--empty container">
                  <section className="cities__no-places">
                    <div className="cities__status-wrapper tabs__content">
                      <b className="cities__status">Error loading offers</b>
                      <p className="cities__status-description">{error}</p>
                    </div>
                  </section>
                  <div className="cities__right-section"></div>
                </div>
              );
            }

            if (filteredOffers.length === 0) {
              return (
                <div className="cities__places-container cities__places-container--empty container">
                  <section className="cities__no-places">
                    <div className="cities__status-wrapper tabs__content">
                      <b className="cities__status">No places to stay available</b>
                      <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
                    </div>
                  </section>
                  <div className="cities__right-section"></div>
                </div>
              );
            }

            return (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
                  <SortOptions />
                  <OfferList
                    offers={filteredOffers}
                    variant="cities"
                    onOfferHover={setHoveredOfferId}
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    {filteredOffers.length > 0 ? (
                      <Map
                        offers={filteredOffers}
                        selectedOffer={filteredOffers[0]}
                        hoveredOfferId={hoveredOfferId}
                      />
                    ) : null}
                  </section>
                </div>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;


