import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ProfilePage from '../Components/ProfilePage.jsx';
import data from './data.json';


describe('ProfilePage component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <ProfilePage
          loading={true}
          isAuthenticated={false}
          accountData={data}
        />
      )
    );
  });
});

describe('ProfilePage Auth --->', () => {
  test('should not display Loading when a user is logged in', () => {
    const { queryByTestId } = render(
      <ProfilePage loading={false} isAuthenticated={true} accountData={data} />
    );

    expect(queryByTestId('auth-loading')).not.toBeInTheDocument();
  });

  test('should display Loading when a user is not logged in', () => {
    const { queryByTestId } = render(
      <ProfilePage loading={true} isAuthenticated={false} accountData={data} />
    );

    expect(queryByTestId('auth-loading')).toBeInTheDocument();
  });
});
