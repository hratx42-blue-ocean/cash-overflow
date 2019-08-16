import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import BudgetPage from '../Components/BudgetPage.jsx';

describe('BudgetPage component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(<BudgetPage loading={false} isAuthenticated={true} />)
    );
  });
});

describe('BudgetPage Auth --->', () => {
  test('should not display Loading when a user is logged in', () => {
    const { queryByTestId } = render(
      <BudgetPage loading={false} isAuthenticated={true} />
    );

    expect(queryByTestId('auth-loading')).not.toBeInTheDocument();
  });

  test('should display Loading when a user is not logged in', () => {
    const { queryByTestId } = render(
      <BudgetPage loading={true} isAuthenticated={false} />
    );

    expect(queryByTestId('auth-loading')).toBeInTheDocument();
  });
});
