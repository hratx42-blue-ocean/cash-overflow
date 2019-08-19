import React from 'react';
import { shallow, mount } from 'enzyme';
import AlertBox from '../Components/AlertBox.jsx';
import AlertCard from '../Components/AlertCard.jsx';
import data from './data.json';


describe('Alert Box --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <AlertBox accounts={data.accounts} recurringTransactions={data.recurringTransactions} budget={data.budgetCategories} />
      )
    );
  });

  test('should mount in a full DOM', async () => {
    expect(
      await mount(
        <AlertBox accounts={data.accounts} recurringTransactions={data.recurringTransactions} budget={data.budgetCategories} />
      )
    );
  });
});

describe('Alert Card --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<AlertCard />));
  });

  test('should mount in a full DOM', async () => {
    expect(await mount(<AlertCard />));
  });
});
