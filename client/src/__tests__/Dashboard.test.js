import React from 'react';
import { shallow, mount, render } from 'enzyme';
import fakeData from '../../../db/dataSeeder';

import DashboardPage from '../Components/DashboardPage';

const data = fakeData.createData();

describe('Dashboard component --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<DashboardPage accountData={data} />));
  });

  test('should mount in a full DOM', async () => {
    expect(await mount(<DashboardPage accountData={data} />));
  });

  test('should be selectable by class "dashboardPage"', async () => {
    expect(
      await shallow(<DashboardPage accountData={data} />).is('.dashboardPage'),
    ).toBe(true);
  });
});
