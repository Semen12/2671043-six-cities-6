import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NotFoundPage } from './not-found-page';
import { NameSpace, AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Page: NotFoundPage', () => {
  it('should render 404 text and link', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.Data]: { favorites: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
