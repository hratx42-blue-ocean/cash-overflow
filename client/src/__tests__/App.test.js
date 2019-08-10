import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../App';

describe('App component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<App />));
  });

  test('should be selectable by class "App"', async function() {
    expect(await shallow(<App />).is('.app')).toBe(true);
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<App />).find('.app').length).toBe(1);
  });
});
