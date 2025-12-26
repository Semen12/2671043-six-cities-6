import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { LoginPage } from './login-page';
import { NameSpace, AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Page: LoginPage', () => {
  it('should render login form', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.App]: { error: null },
      [NameSpace.Data]: { favorites: [] }, // Header может требовать
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i })
    ).toBeInTheDocument();
  });
});
