import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Auth0Provider } from './react-auth0-wrapper';
import config from './auth_config.js';
// import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const appTheme = {
  palette: {
    primary: {
      main: '#880e4f'
    },
    secondary: {
      light: '#bdbdbd',
      main: '#9e9e9e',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    tableRow: {
      hoverColor: 'rgba(136, 14, 79, 0.5)'
    }
  }
};

const theme = createMuiTheme(appTheme);

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
  <MuiThemeProvider theme={theme}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
