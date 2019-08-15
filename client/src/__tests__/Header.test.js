import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthAndMemoryWrapper } from './utils/util.wrappers';
import Header from '../Components/Header.jsx';

describe('Header component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <MemoryRouter initialEntries={['/random']}>
          <Header />
        </MemoryRouter>
      )
    );
  });

  test('should mount in a full DOM', async () => {
    expect(
      await mount(
        <AuthAndMemoryWrapper>
          <Header />
        </AuthAndMemoryWrapper>
      )
    );
  });
});
