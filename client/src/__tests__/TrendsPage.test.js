import React from 'react';
import { shallow, mount, render } from 'enzyme';

import CenteredTabs from '../Components/TrendsPage.jsx';

describe('CenteredTabs --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<CenteredTabs />));
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<CenteredTabs />));
  });
});
