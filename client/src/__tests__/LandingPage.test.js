import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import LandingPage from '../Components/LandingPage';

describe('Dashboard component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<LandingPage />));
  });

  test('should mount in a full DOM', async function() {
    expect(
      await mount(
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      )
    );
  });

  test('should be selectable by class "dashboardPage"', async function() {
    expect(await shallow(<LandingPage />).is('.landingPage')).toBe(true);
  });
});
