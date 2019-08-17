import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AccountsPage from '../Components/AccountsPage.jsx';
import data from './data.json';

describe('AccountsPage component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <AccountsPage
          loading={true}
          isAuthenticated={false}
          accountData={data}
        />
      )
    );
  });
});

describe('AccountsPage Auth --->', () => {
  test('should not display Loading when a user is logged in', () => {
    const { queryByTestId } = render(
      <AccountsPage loading={false} isAuthenticated={true} accountData={data} />
    );

    expect(queryByTestId('auth-loading')).not.toBeInTheDocument();
  });

  test('should display Loading when a user is not logged in', () => {
    const { queryByTestId } = render(
      <AccountsPage loading={true} isAuthenticated={false} accountData={data} />
    );

    expect(queryByTestId('auth-loading')).toBeInTheDocument();
  });
});
