import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import LandingPage from '../Components/LandingPage';

describe('Dashboard component --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<LandingPage />));
  });

  test('should mount in a full DOM', async () => {
    expect(
      await mount(
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>,
      ),
    );
  });

  test('should be selectable by class "dashboardPage"', async () => {
    expect(await shallow(<LandingPage />).is('.landingPage')).toBe(true);
  });
});
