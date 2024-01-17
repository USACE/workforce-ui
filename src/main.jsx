import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'redux-bundler-react';
import getStore from './app-bundles';
import cache from './cache';


cache.getAll().then((initialData) => {
  const store = getStore(initialData);

  if (import.meta.env.VITE_NODE_ENV === 'development') window.store = store;

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
