import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AccountsPage from '../Components/AccountsPage.jsx';

describe('Accounts component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<AccountsPage />));
  });
});