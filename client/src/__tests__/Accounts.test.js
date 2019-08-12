import React from 'react';
import { shallow, mount, render } from 'enzyme';

<<<<<<< HEAD
import Accounts from '../Components/Accounts';
=======
import Accounts from '../Components/Accounts.jsx';
>>>>>>> 4e3cc0744353dfda23634b7b05d278ba7eb4b572

describe('Accounts component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<Accounts />));
  });
});