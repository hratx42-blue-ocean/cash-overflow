import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from '@testing-library/react';
import fakeData from '../../../db/dataSeeder';
import Loading from '../Components/Loading';
import { AuthContextProvider } from './util/util.authContextWrapper';
import '@testing-library/jest-dom/extend-expect';

import DashboardPage from '../Components/DashboardPage';

const data = fakeData.createData();

describe('DashboardPage component --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<DashboardPage accountData={data} />));
  });

  test('should display DashboardPage when a user is logged in', () => {
    const { container } = render(
      <DashboardPage accountData={data} user={{ yes: 'yes' }} loading={false} />
    );

    const loading = container.getElementsById('loading');
    expect(loading).toBe(null);
  });

  test('should be selectable by class "dashboardPage"', async () => {
    expect(
      await shallow(<DashboardPage accountData={data} />).is('.dashboardPage')
    ).toBe(true);
  });
});
