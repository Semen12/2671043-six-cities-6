import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { store } from './store';

store.dispatch(checkAuthAction());

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
