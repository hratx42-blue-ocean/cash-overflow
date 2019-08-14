import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AccountsPage from '../Components/AccountsPage.jsx';

describe('Accounts component --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallow(<AccountsPage />));
  });
});
