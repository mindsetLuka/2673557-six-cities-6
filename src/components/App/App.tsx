import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../pages/MainScreen/MainScreen';
import LoginScreen from '../pages/LoginScreen/LoginScreen';
import FavoritesScreen from '../pages/FavoritesScreen/FavoritesScreen';
import OfferScreen from '../pages/OfferScreen/OfferScreen';
import NotFoundScreen from '../pages/NotFoundScreen/NotFoundScreen';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../pages/PrivateRoute/PrivateRoute';

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen offersCount={offersCount} />} />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen />
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


