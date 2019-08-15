import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthAndMemoryWrapper } from './utils/util.wrappers';
import LandingPage from '../Components/LandingPage';

describe('Dashboard component --->', () => {
  test('should render without throwing an error', async () => {
    expect(
      await shallow(
        <AuthAndMemoryWrapper>
          <LandingPage />
        </AuthAndMemoryWrapper>
      )
    );
  });

  test('should mount in a full DOM', async () => {
    expect(
      await mount(
        <AuthAndMemoryWrapper>
          <LandingPage />
        </AuthAndMemoryWrapper>
      )
    );
  });
});
