import React from 'react';
import { shallow, mount, render } from 'enzyme';

import BudgetPage from '../Components/BudgetPage.jsx';

describe('Profile component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<BudgetPage />));
  });
});
