import React from 'react';
import App from '../App.jsx';

import { shallowWithAuth, mountWithAuth } from './util/util.authContextWrapper';

describe('App component --->', function() {
  test('should shallow render without throwing an error', function() {
    expect(shallowWithAuth(<App />));
  });

  test('should mount in a full DOM render', function() {
    expect(mountWithAuth(<App />));
  });
});
