import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { shallowWithAuth, mountWithAuth } from './util/util.authContextWrapper';

import Header from '../Components/Header.jsx';

describe('Header component --->', () => {
  test('should render without throwing an error', async () => {
    expect(await shallowWithAuth(<Header />));
  });

  test('should mount in a full DOM', async () => {
    expect(
      await mountWithAuth(
        <MemoryRouter initialEntries={['/random']}>
          <Header />
        </MemoryRouter>,
      ),
    );
  });
});
