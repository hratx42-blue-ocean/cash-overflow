import React from 'react';
import { shallow, mount, render } from 'enzyme';

import BudgetAllotment from '../Components/BudgetAllotment.jsx';

describe('Profile component --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<BudgetAllotment allotment={0} />));
  });
});
