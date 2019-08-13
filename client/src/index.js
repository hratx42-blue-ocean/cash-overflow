import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Auth0Provider } from './react-auth0-wrapper';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import config from './auth_config.js';
// import './index.css';

import AuthNavBar from './Components/AuthNavBar.jsx';
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

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <AuthNavBar />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
