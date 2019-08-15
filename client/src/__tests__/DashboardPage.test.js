import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from '@testing-library/react';
import fakeData from '../../../db/dataSeeder';
import Loading from '../Components/Loading';
import '@testing-library/jest-dom/extend-expect';

import DashboardPage from '../Components/DashboardPage';

const data = fakeData.createData();

describe('DashboardPage component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <DashboardPage
          isAuthenticated={true}
          loading={false}
          accountData={data}
        />
      )
    );
  });

  test('should be selectable by class "dashboardPage"', async () => {
    expect(
      await shallow(
        <DashboardPage
          isAuthenticated={true}
          loading={false}
          accountData={data}
        />
      ).is('.dashboardPage')
    ).toBe(true);
  });
});

describe('DashboardPage Loading and Auth --->', () => {
  test('should not display Loading when a user is logged in', () => {
    const { queryByTestId } = render(
      <DashboardPage
        accountData={data}
        loading={false}
        isAuthenticated={true}
      />
    );

    expect(queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should display Loading when a user is not logged in', () => {
    const { queryByTestId } = render(
      <DashboardPage
        accountData={data}
        loading={true}
        isAuthenticated={false}
      />
    );

    expect(queryByTestId('loading')).toBeInTheDocument();
  });
});
