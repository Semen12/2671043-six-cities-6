import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { FavoritesPage } from './favorites-page';
import { NameSpace, AuthorizationStatus } from '../../const';

const mockStore = configureMockStore([thunk]);

describe('Page: FavoritesPage', () => {
  it('should render empty state when no favorites', () => {
    const store = mockStore({
      [NameSpace.Data]: { favorites: [] },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.ru' },
      },
      [NameSpace.App]: { error: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Favorites \(empty\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render favorites list when favorites exist', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        favorites: [
          {
            id: '1',
            title: 'Favorite Place',
            city: {
              name: 'Paris',
              location: { latitude: 0, longitude: 0, zoom: 10 },
            },
            price: 100,
            type: 'apartment',
            isFavorite: true,
            rating: 5,
            previewImage: 'img.jpg',
          },
        ],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.ru' },
      },
      [NameSpace.App]: { error: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText('Favorite Place')).toBeInTheDocument();
  });
});
