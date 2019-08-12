import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TrendsPage from '../Components/TrendsPage.jsx';

describe('TrendsPage --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<TrendsPage />));
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<TrendsPage />));
  });
});
