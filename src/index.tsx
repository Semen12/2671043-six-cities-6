import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

store.dispatch(checkAuthAction());

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
