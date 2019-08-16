import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthAndMemoryWrapper } from './utils/util.wrappers';
import Footer from '../Components/Footer.jsx';

describe('Footer component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <MemoryRouter initialEntries={['/random']}>
          <Footer />
        </MemoryRouter>
      )
    );
  });

  test('should mount in a full DOM', async () => {
    expect(
      await mount(
        <AuthAndMemoryWrapper>
          <Footer />
        </AuthAndMemoryWrapper>
      )
    );
  });
});
