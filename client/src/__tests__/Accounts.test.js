import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Accounts from '../Components/Accounts';

describe('Accounts component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<Accounts />));
  });
});