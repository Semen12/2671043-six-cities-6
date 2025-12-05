import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { AppRoute, AuthStatus } from '../../const';
import { LoginPage } from '../../pages/login-page/login-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import { Offer } from '../../types/offer';
type AppProps = {
  placesCount: number;
  offers: Offer[];
};

export const App = ({ placesCount,offers }: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage placesCount={placesCount} offers={offers}/>}
      />
      <Route path={AppRoute.Login} element={<LoginPage />}/>
      <Route path={AppRoute.Favorites} element={<PrivateRoute authStatus={AuthStatus.Auth}><FavoritesPage offers={offers}/></PrivateRoute> }/>
      <Route path={AppRoute.Offer} element={<OfferPage />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  </BrowserRouter>
);
