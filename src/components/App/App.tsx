import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainScreen from '../pages/MainScreen/MainScreen';
import LoginScreen from '../pages/LoginScreen/LoginScreen';
import FavoritesScreen from '../pages/FavoritesScreen/FavoritesScreen';
import OfferScreen from '../pages/OfferScreen/OfferScreen';
import NotFoundScreen from '../pages/NotFoundScreen/NotFoundScreen';
import { AppRoute } from '../../const';
import PrivateRoute from '../pages/PrivateRoute/PrivateRoute';
import { RootState } from '../../store';

function App(): JSX.Element {
  const offers = useSelector((state: RootState) => state.data.offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
        <Route path={AppRoute.Unknown} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


