import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Auth0Provider,
  Auth0Context,
  useAuth0
} from '../../react-auth0-wrapper';
import config from '../../auth_config';

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

export function mountWithAuth(children) {
  return mount(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

export function shallowWithAuth(children) {
  return shallow(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
