import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { App } from './app';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
  [NameSpace.Data]: {
    offers: [],
    isOfferLoading: false,
    hasError: false,
    favorites: [],
    nearbyOffers: [],
    offer: null,
    comments: [],
  },
  [NameSpace.App]: {
    cityActive: 'Paris',
    currentSortOption: 'Popular',
    error: null,
  },
};

describe('Application Routing', () => {

  it('should render "MainPage" when user navigate to "/"', () => {
    const store = mockStore(baseState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const store = mockStore(baseState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/:id"', () => {
    const store = mockStore({
      ...baseState,
      [NameSpace.Data]: {
        ...baseState[NameSpace.Data],
        offer: {
          id: '1',
          title: 'Test Offer',
          type: 'apartment',
          price: 100,
          rating: 4.5,
          bedrooms: 2,
          maxAdults: 4,
          isPremium: false,
          isFavorite: false,
          description: 'Test description',
          images: [],
          goods: ['Wi-Fi'],
          host: { avatarUrl: 'img/avatar.svg', name: 'Host', isPro: false },

          city: {
            name: 'Paris',
            location: {
              latitude: 48.85661,
              longitude: 2.351499,
              zoom: 13
            }
          },

          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        isOfferLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Offer/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const store = mockStore(baseState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites" and is Auth', () => {
    const store = mockStore({
      ...baseState,
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.ru', avatarUrl: '' },
      },
      [NameSpace.Data]: {
        ...baseState[NameSpace.Data],
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should redirect to "LoginPage" when user navigate to "/favorites" and is NoAuth', () => {
    const store = mockStore({
      ...baseState,
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

});
