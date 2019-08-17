import React from 'react';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DashboardPage from '../Components/DashboardPage';
import data from './data.json';

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
});

describe('DashboardPage Auth --->', () => {
  test('should not display Loading when a user is logged in', () => {
    const { queryByTestId } = render(
      <DashboardPage
        accountData={data}
        loading={false}
        isAuthenticated={true}
      />
    );

    expect(queryByTestId('auth-loading')).not.toBeInTheDocument();
  });

  test('should display Loading when a user is not logged in', () => {
    const { queryByTestId } = render(
      <DashboardPage
        accountData={data}
        loading={true}
        isAuthenticated={false}
      />
    );

    expect(queryByTestId('auth-loading')).toBeInTheDocument();
  });
});
