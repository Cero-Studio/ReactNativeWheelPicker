/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import moment from 'moment'

import { WheelPicker, TimePicker, DatePicker } from 'react-native-wheel-picker-android'

const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

const App: () => React$Node = () => {
  const [selectedItem, setSelectedItem] = useState(0)
  const [time, setTime] = useState(new Date())
  const [date, setDate] = useState(new Date())
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Text>{weekdays[selectedItem]}</Text>
          <WheelPicker onItemSelected={(index) => setSelectedItem(index)} data={weekdays}/>
          <Text>{moment(time).format('hh:mm a')}</Text>
          <TimePicker 
            initDate={new Date(moment().add(1, 'hour'))} 
            onTimeSelected={(time) => {
              setTime(time)
              console.log('setting time', time)
            }
          }/>
          <Text>{moment(date).format('DD.MM.YY hh:mm a')}</Text>
          <DatePicker mode={'date'} onDateSelected={date => setDate(date)}/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
