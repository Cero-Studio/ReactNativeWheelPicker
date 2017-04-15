import React from 'react';

import test from 'ava';
import { shallow } from 'enzyme';
import WheelPicker from '../WheelPicker';
const wrapper = shallow(<WheelPicker />);

test('component exists', (t) => {
  t.is(wrapper.length, 1); // exists
});

test('component structure', (t) => {
  t.is(wrapper.name(), 'WheelPicker');
  t.is(wrapper.children().length, 0);
});

test('props', (t) => {
  const data = [1, 2, 3];
  const wrapperPress = shallow(<WheelPicker selectedItemTextColor={'yellow'} itemSpace={39} renderIndicator indicatorColor={'grey'} curtainColor={'green'} itemTextColor={'white'} itemTextFontFamily={'Tahoma'} itemTextSize={23} selectedItemPosition={1} isCyclic={false} isCurved isAtmospheric visibleItemCount={4} backgroundColor={'black'} data={data} />);

  t.is(wrapperPress.prop('data').length, 3);
  t.is(wrapperPress.prop('isCurved'), true);
  t.is(wrapperPress.prop('isAtmospheric'), true);
  t.is(wrapperPress.prop('isCyclic'), false);
  t.is(wrapperPress.prop('visibleItemCount'), 4);
  t.is(wrapperPress.prop('backgroundColor'), 'black');
  t.is(wrapperPress.prop('selectedItemPosition'), 1);
  t.is(wrapperPress.prop('itemTextSize'), 23);
  t.is(wrapperPress.prop('itemTextColor'), 'white');
  t.is(wrapperPress.prop('itemTextFontFamily'), 'Tahoma');
  t.is(wrapperPress.prop('curtainColor'), 'green');
  t.is(wrapperPress.prop('renderIndicator'), true);
  t.is(wrapperPress.prop('indicatorColor'), 'grey');
  t.is(wrapperPress.prop('itemSpace'), 39);
  t.is(wrapperPress.prop('selectedItemTextColor'), 'yellow');
});
