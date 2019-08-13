import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { shallowWithAuth, mountWithAuth } from './util/util.authContextWrapper';

import Header from '../Components/Header.jsx';

describe('Header component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallowWithAuth(<Header />));
  });

  test('should mount in a full DOM', async function() {
    expect(
      await mountWithAuth(
        <MemoryRouter initialEntries={['/random']}>
          <Header />
        </MemoryRouter>
      )
    );
  });
});
