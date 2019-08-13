import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from '../App.jsx';

// // A function that routes the user to the right place
// // after login
// const onRedirectCallback = appState => {
//   window.history.replaceState(
//     {},
//     document.title,
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.pathname
//   );
// };

// let container;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

describe('App component --->', function() {
  test('should shallow render without throwing an error', function() {
    expect(shallow(<App />));
  });

  test('should mount in a full DOM render', function() {
    expect(mount(<App />));
  });
});
