import React from 'react';
import { connect } from 'redux-bundler-react';

import { getNavHelper } from 'internal-nav-helper';

import './index.css';

// Application Components
import Modal from './app-components/Modal';

const App = connect(
  'selectRoute',
  'doUpdateUrl',
  ({ route: Route, doUpdateUrl }) => {
    return (
      <div onClick={getNavHelper((url) => doUpdateUrl(url))}>
        <Route />
        <Modal />
      </div>
    );
  }
);

export default App