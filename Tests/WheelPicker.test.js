import React from 'react';

import test from 'ava';
import { shallow } from 'enzyme';
import WheelPicker from '../WheelPicker';
const wrapper = shallow(<WheelPicker />);

test('component exists', (t) => {
  t.is(wrapper.length, 1); // exists
});

test('component structure', (t) => {
  t.is(wrapper.name(), 'WheelPicker'); // the right root component
  t.is(wrapper.children().length, 0); // has 1 child
});

test('data', (t) => {
  const data = [1, 2, 3];
  const wrapperPress = shallow(<WheelPicker isCyclic={false} isCurved isAtmospheric visibleItemCount={4} backgroundColor={'black'} data={data} />);

  t.is(wrapperPress.prop('data').length, 3);
  t.is(wrapperPress.prop('isCurved'), true);
  t.is(wrapperPress.prop('isAtmospheric'), true);
  t.is(wrapperPress.prop('isCyclic'), false);
  t.is(wrapperPress.prop('visibleItemCount'), 4);
  t.is(wrapperPress.prop('backgroundColor'), 'black');
});
