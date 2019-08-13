import React from 'react';
import { shallow, mount, render } from 'enzyme';
import fakeData from '../../../db/dataSeeder';
const data = fakeData.createData();

import DashboardPage from '../Components/DashboardPage';

describe('Dashboard component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<DashboardPage accountData={data} />));
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<DashboardPage accountData={data} />));
  });

  test('should be selectable by class "dashboardPage"', async function() {
    expect(
      await shallow(<DashboardPage accountData={data} />).is('.dashboardPage')
    ).toBe(true);
  });
});
