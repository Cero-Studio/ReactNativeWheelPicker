/**
 * @prettier
 * @flow
 * */

import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import type { Event } from './Utils';

type Props = {
  onDateSelected: Date => void,
  initDate: Date,
};

type State = {
  chosenDate: Date,
};

export default class DatePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { chosenDate: props.initDate || new Date() };
  }

  setDate = (_: Event, newDate: Date) => {
    this.setState({ chosenDate: newDate });
    const { onDateSelected } = this.props;
    if (onDateSelected && newDate) {
      onDateSelected(newDate);
    }
  };

  render() {
    return (
      <DateTimePicker
        style={styles.picker}
        value={this.state.chosenDate}
        onChange={(_, date) => this.setDate(date)}
        {...this.props}
      />
    );
  }
}

let styles = StyleSheet.create({
  picker: {
    width: Dimensions.get('screen').width,
  },
});
