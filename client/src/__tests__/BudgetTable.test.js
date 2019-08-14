import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BudgetTable from '../Components/BudgetTable.jsx';

describe('Profile component --->', () => {
  const rows = [{
    category: 'category', allotted: 0, spend: 0, remaining: 0
  }];
  test('should render without throwing an error', async () => {
    expect(await shallow(<BudgetTable rows={rows} />));
  });
});
