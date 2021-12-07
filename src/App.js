import React from 'react';
import { connect } from 'redux-bundler-react';
import Modal from './app-components/modal';

const App = connect('selectRoute', ({ route: Route }) => {
  return (
    <>
      <Route />
      <Modal />
    </>
  );
});

export default App;
