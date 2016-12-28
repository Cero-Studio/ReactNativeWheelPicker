import React from 'react';

import test from 'ava';
import { shallow } from 'enzyme';
import DatePicker from '../DatePicker';

const wrapper = shallow(<DatePicker daysCount={23} format24 />);

test('component exists', (t) => {
  t.is(wrapper.length, 1); // exists
});

test('component structure', (t) => {
  t.is(wrapper.name(), 'View');
  t.is(wrapper.children().length, 3);
});
