import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from '../App.jsx';

import { Auth0Provider } from '../react-auth0-wrapper';
import config from '../auth_config';

import { shallowWithAuth, mountWithAuth } from './util/authContextWrapper';
// import './index.css';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

describe('App component --->', function() {
  test('should shallow render without throwing an error', function() {
    expect(shallowWithAuth(<App />));
  });

  test('should mount in a full DOM render', function() {
    expect(mountWithAuth(<App />));
  });
});
