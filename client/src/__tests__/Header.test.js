import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Header from '../Components/Header.jsx';

describe('Header component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<Header />));
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<Header />));
  });
});
