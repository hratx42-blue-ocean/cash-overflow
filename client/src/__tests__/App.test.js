import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from '../App.jsx';

describe('App component --->', function() {
  test('should render without throwing an error', function() {
    expect(shallow(<App />));
  });

  test('should mount in a full DOM', function() {
    expect(
      mount(
        <MemoryRouter initialEntries={['/random']}>
          <App />
        </MemoryRouter>
      )
    );
  });
});
