import React from 'react';
import { shallow, mount, render } from 'enzyme';

import BudgetPage from '../Components/BudgetPage';
import fakeData from '../../../db/dataSeeder.js';
const budgetCategories = fakeData.createData().budgetCategories;

describe('Budget component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<BudgetPage categories={budgetCategories} />));
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<BudgetPage categories={budgetCategories} />));
  });
});
