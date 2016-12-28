import React from 'react';

import test from 'ava';
import { shallow } from 'enzyme';
import TimePicker from '../TimePicker';
const wrapper = shallow(<TimePicker />);

test('component exists', (t) => {
  t.is(wrapper.length, 1); // exists
});

test('component structure', (t) => {
  t.is(wrapper.name(), 'View');
  t.is(wrapper.children().length, 3);
});
