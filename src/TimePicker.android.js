/**
 * @prettier
 * @flow
 * */

import React from 'react';
import { View, StyleSheet, NativeModules, Text } from 'react-native';
import WheelPicker from './WheelPicker';
import { hourTo24Format, hourTo12Format, getHoursArray, getMinutesArray, getAmArray, HOUR, AM } from './Utils';

const { RNDeviceTimeFormat } = NativeModules;

type Event = {
  data: string | number,
  position: number,
};

type Props = {|
  initTime: string,
  onTimeSelected: Date => void,
  minuteInterval?: number,
  style?: any,
|};

type State = {|
  selectedDate: Date,
  hours: Array<number>,
  minutes: Array<string>,
  selectedHourIndex: number,
  selectedMinuteIndex: number,
  selectedAmIndex: number,
  format24: boolean,
|};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default class TimePicker extends React.PureComponent<Props, State> {
  state = {
    selectedDate: new Date(),
    hours: [],
    minutes: [],
    selectedHourIndex: 0,
    selectedMinuteIndex: 0,
    selectedAmIndex: 0,
    format24: false,
  };

  recountValues() {
    const {
      props: { initTime, minuteInterval },
      state: { format24 },
    } = this;

    const selectedDate = initTime ? new Date(initTime) : new Date();
    const time12format = hourTo12Format(selectedDate.getHours());
    const time24format = selectedDate.getHours();
    const hours = getHoursArray(format24);
    const selectedHourIndex = format24 ? time24format : Number(time12format[0]) - 1;

    const minutes = getMinutesArray(minuteInterval);
    const minutesCount = minutes.length;
    const selectedMinuteIndex = Math.round(selectedDate.getMinutes() / (HOUR / minutesCount));
    const selectedAmIndex = time12format[1] === AM ? 0 : 1;
    this.setState({
      selectedDate,
      hours,
      minutes,
      selectedHourIndex,
      selectedMinuteIndex,
      selectedAmIndex,
    });
  }

  async resolveTimeFormat() {
    const format24 = await RNDeviceTimeFormat.is24HourFormat();
    this.setState({ format24 }, this.recountValues);
  }

  constructor(props: Props) {
    super(props);
    this.resolveTimeFormat();
  }

  render() {
    const {
      props: { style },
      state: { hours, selectedHourIndex, minutes, selectedMinuteIndex },
    } = this;

    return (
      <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
        <WheelPicker
          isCyclic
          style={style}
          {...this.props}
          data={hours}
          onItemSelected={this.onHourSelected}
          selectedItem={selectedHourIndex}
          initPosition={selectedHourIndex}
        />
        <WheelPicker
          style={style}
          isCyclic
          {...this.props}
          data={minutes}
          onItemSelected={this.onMinuteSelected}
          selectedItem={selectedMinuteIndex}
          initPosition={selectedMinuteIndex}
        />
        {!this.state.format24 && this.renderAm()}
      </View>
    );
  }

  renderAm() {
    const {
      props: { itemTextColor, selectedItemTextColor, style },
      state: { selectedAmIndex },
    } = this;
    return (
      <WheelPicker
        style={style}
        {...this.props}
        data={getAmArray()}
        onItemSelected={this.onAmSelected}
        selectedItem={selectedAmIndex}
        initPosition={selectedAmIndex}
      />
    );
  }

  onHourSelected = (position: number) => {
    this.setState({ selectedHourIndex: position });
    const { selectedDate, hours } = this.state;
    const selectedHour = hours[position];

    if (this.state.format24) {
      selectedDate.setHours(Number(selectedHour));
    } else {
      const time12format = hourTo12Format(selectedDate.getHours());
      const newTime12Format = `${selectedHour} ${time12format[1]}`;
      const selectedHour24format = hourTo24Format(newTime12Format);
      selectedDate.setHours(selectedHour24format);
    }
    this.onTimeSelected(selectedDate);
  };

  onMinuteSelected = (position: number) => {
    this.setState({ selectedMinuteIndex: position });
    const { selectedDate } = this.state;
    selectedDate.setMinutes(Number(this.state.minutes[position]));
    this.onTimeSelected(selectedDate);
  };

  onAmSelected = (position: number) => {
    this.setState({ selectedAmIndex: position });
    const { selectedDate } = this.state;
    const time12format = hourTo12Format(selectedDate.getHours());
    const newTime12Format = `${time12format[0]} ${getAmArray()[position]}`;
    const selectedHour24format = hourTo24Format(newTime12Format);
    selectedDate.setHours(selectedHour24format);
    this.onTimeSelected(selectedDate);
  };

  onTimeSelected(selectedDate: Date) {
    const { onTimeSelected } = this.props;
    if (onTimeSelected) {
      onTimeSelected(selectedDate);
    }
  }
}
