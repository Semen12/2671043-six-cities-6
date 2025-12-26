import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { PrivateRoute } from './private-route';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';

const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {

  const renderPrivateRoute = (status: AuthorizationStatus) => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: status },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1>Login Page</h1>} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render component for public route, when user not authorized', () => {
    renderPrivateRoute(AuthorizationStatus.NoAuth);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    renderPrivateRoute(AuthorizationStatus.Auth);

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login Page/i)).not.toBeInTheDocument();
  });
});
