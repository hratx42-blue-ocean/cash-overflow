import React from 'react';
import App from '../App.jsx';
import Loading from '../../src/Components/Loading.jsx';
import { MemoryRouter } from 'react-router-dom';
import { shallowWithAuth, mountWithAuth } from './util/util.authContextWrapper';

xdescribe('Restricted Routing --->', function() {
  test('should display a loading screen when an unauthenticated user attempts to access /dashboard', async function() {
    let wrapper = await mountWithAuth(<App />, '/dashboard');

    console.log('Wrapper for /dashboard is:', wrapper);

    // expect(wrapper.containsMatchingElement(<Loading />)).to.equal(true);
    expect(wrapper.containsMatchingElement(<Loading />)).to.equal(true);
  });

  test('should mount in a full DOM render', function() {
    expect(mountWithAuth(<App />));
  });
});
