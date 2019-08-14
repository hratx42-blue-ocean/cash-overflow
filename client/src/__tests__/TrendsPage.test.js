import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TrendsPage from '../Components/TrendsPage.jsx';

describe('TrendsPage --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<TrendsPage />));
  });

  test('should mount in a full DOM', async () => {
    expect(await mount(<TrendsPage />));
  });
});
