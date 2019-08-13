import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ProfilePage from '../Components/ProfilePage.jsx';

describe('Profile component --->', function() {
  test('should render without throwing an error', async function() {
    expect(await shallow(<ProfilePage />));
  });

  test('should be selectable by class "ProfilePage"', async function() {
    expect(await shallow(<ProfilePage />).is('.profilePage')).toBe(true);
  });

  test('should mount in a full DOM', async function() {
    expect(await mount(<ProfilePage />).find('.profilePage').length).toBe(3);
  });
});

// describe('Profile edit buttons should toggle input fields', function() {
//   test('first name', async function() {
//     const wrapper = mount(<ProfilePage />).at(0);
//     const simulate = wrapper.find('edit').first().simulate('click');
//     expect(await wrapper.find('edit').props().firstNameIsHidden.toEqual(true));
//   });
// });
