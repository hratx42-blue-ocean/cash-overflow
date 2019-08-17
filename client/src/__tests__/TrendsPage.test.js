import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import fakeData from '../../../db/dataSeeder';

import TrendsPage from '../Components/TrendsPage.jsx';

const data = fakeData.createData();

describe('TrendsPage component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <TrendsPage loading={true} isAuthenticated={false} accountData={data} />
      )
    );
  });
});

/**
 * TODO: RE-IMPLEMENT ONCE CHARTJS IS UP_TO_DATE
 * ChartJS does not play well with react-testing-libary. ChartJS still relies on
 * UNSAFE lifecycle methods which don't work with render.
 */

xdescribe('TrendsPage Auth --->', () => {
  test('should not display Loading when a user is logged in', () => {
    const { queryByTestId } = render(
      <TrendsPage loading={false} isAuthenticated={true} accountData={data} />
    );

    expect(queryByTestId('auth-loading')).not.toBeInTheDocument();
  });

  test('should display Loading when a user is not logged in', () => {
    const { queryByTestId } = render(
      <TrendsPage loading={true} isAuthenticated={false} accountData={data} />
    );

    expect(queryByTestId('auth-loading')).toBeInTheDocument();
  });
});
