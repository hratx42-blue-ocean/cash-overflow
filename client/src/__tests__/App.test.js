import React from 'react';
import App from '../App.jsx';
import { shallow, mount } from 'enzyme';
import { AuthAndMemoryWrapper } from './utils/util.wrappers.js';

describe('App component --->', () => {
  test('should shallow render without throwing an error', () => {
    expect(
      shallow(
        <AuthAndMemoryWrapper>
          <App />
        </AuthAndMemoryWrapper>
      )
    );
  });

  test('should mount in a full DOM render', () => {
    expect(
      mount(
        <AuthAndMemoryWrapper>
          <App />
        </AuthAndMemoryWrapper>
      )
    );
  });
});
