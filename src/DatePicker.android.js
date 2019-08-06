/**
 * @prettier
 * @flow
 * */

import React from "react";
import { View, StyleSheet } from "react-native";
import WheelPicker from "./WheelPicker";
import {
  hourTo24Format,
  hourTo12Format,
  pickerDateArray,
  getHoursArray,
  increaseDateByDays,
  getFiveMinutesArray,
  getAmArray,
  computeDatePosition,
  getDateFromPosition,
  computeHourPosition,
  computeMinutePosition,
  computeAMPMPosition
} from "./Utils";

const DAYS_IN_A_YEAR = 365;

const millisecondsPerDay = 1000 * 60 * 60 * 24;
const HOUR = 60;

type Props = {
  initialDate?: string | Date,
  minimumDate?: string | Date,
  onDateSelected: Date => void,
  hours?: Array<number>,
  minutes?: Array<string>,
  daysCount: number,
  days?: Array<number>,
  hideDate?: boolean,
  hideHours?: boolean,
  hideMinutes?: boolean,
  hideAM?: boolean,
  format24?: boolean
};

type State = {
  selectedDate: Date,
  daysAfterSelectedDate: number,
  dayPos: number,
  hourPos: number,
  minutePos: number,
  amPos: number
};

export default class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    daysCount: DAYS_IN_A_YEAR
  };

  constructor(props: Props) {
    super(props);
    console.log({ initDate: props.initialDate });

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0);
    todayAtMidnight.setMinutes(0);
    todayAtMidnight.setSeconds(0);
    console.log({ todayAtMidnight });

    let initialDate = new Date();

    this.startDate = props.minimumDate || todayAtMidnight;
    console.log({ startDate: this.startDate });

    // initial date position
    const dayPos = props.initialDate
      ? computeDatePosition(
          new Date(props.initialDate),
          this.startDate,
          props.daysCount
        )
      : 0;
    initialDate = getDateFromPosition(dayPos, this.startDate);
    console.log({ dayPos, initialDate });

    //initial hour position
    this.hourTable = props.hours || getHoursArray(props.format24);
    const hourPos = props.initialDate
      ? computeHourPosition(props.initialDate, this.hourTable, props.format24)
      : 0;
    const amPos = props.initialDate
      ? computeAMPMPosition(props.initialDate)
      : 0;
    initialDate.setHours(this.hourTable[hourPos]);
    console.log({ hourPos, initialDate });

    //initial minute position
    this.minuteTable = props.minutes || getFiveMinutesArray();
    const minutePos = props.initialDate
      ? computeMinutePosition(props.initialDate, this.minuteTable)
      : 0;
    initialDate.setMinutes(this.minuteTable[minutePos]);
    console.log({ minutePos, initialDate });

    initialDate.setSeconds(0);

    this.state = {
      dayPos,
      hourPos,
      minutePos,
      amPos,
      selectedDate: initialDate
    };
  }

  startDate: Date;
  hourTable: string[];
  minuteTable: string[];

  render() {
    const {
      minimumDate,
      days,
      daysCount,
      hours,
      minutes,
      format24,
      backgroundColor,
      hideDate,
      hideHours,
      hideMinutes,
      hideAM
    } = this.props;
    const { dayPos, hourPos, minutePos } = this.state;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {!hideDate && (
          <WheelPicker
            style={styles.dateWheelPicker}
            {...this.props}
            data={pickerDateArray(minimumDate, daysCount)}
            onItemSelected={this.onDaySelected}
            initPosition={0}
            selectedItem={dayPos}
          />
        )}
        {!hideHours && (
          <WheelPicker
            style={styles.wheelPicker}
            {...this.props}
            isCyclic
            data={this.hourTable}
            onItemSelected={this.onHourSelected}
            initPosition={0}
            selectedItem={hourPos}
          />
        )}
        {!hideMinutes && (
          <WheelPicker
            style={styles.wheelPicker}
            {...this.props}
            isCyclic
            data={this.minuteTable}
            onItemSelected={this.onMinuteSelected}
            initPosition={0}
            selectedItem={minutePos}
          />
        )}
        {!this.props.format24 && !hideAM && this.renderAm()}
      </View>
    );
  }

  renderAm() {
    const { amPos } = this.state;
    return (
      <WheelPicker
        style={styles.wheelPicker}
        {...this.props}
        data={getAmArray()}
        onItemSelected={this.onAmSelected}
        initPosition={0}
        selectedItem={amPos}
      />
    );
  }

  updateDate = () => {
    const { dayPos, hourPos, minutePos } = this.state;
    let selectedDate = getDateFromPosition(dayPos, this.startDate);
    selectedDate.setHours(this.hourTable[hourPos]);
    selectedDate.setMinutes(this.minuteTable[minutePos]);
    this.onDateSelected(selectedDate);
  };

  onDaySelected = (position: number) => {
    this.setState(
      {
        dayPos: position
      },
      this.updateDate
    );
  };

  onHourSelected = (position: number) => {
    const selectedDate = this.state.selectedDate;
    const { hours, format24 } = this.props;
    const data = hours || getHoursArray(format24);
    if (this.props.format24) {
      selectedDate.setHours(Number(data[position]));
    } else {
      const time12format = hourTo12Format(selectedDate.getHours());
      const newTime12Format = `${data[position]} ${time12format[1]}`;
      const selectedHour24format = hourTo24Format(newTime12Format);
      selectedDate.setHours(selectedHour24format);
    }
    this.onDateSelected(selectedDate);
  };

  onMinuteSelected = (position: number) => {
    const selectedDate = this.state.selectedDate;
    const { minutes } = this.props;
    const data = minutes || getFiveMinutesArray();
    selectedDate.setMinutes(Number(data[position]));
    this.onDateSelected(selectedDate);
  };

  onAmSelected = (position: number) => {
    const selectedDate = this.state.selectedDate;
    const time12format = hourTo12Format(selectedDate.getHours());
    const newTime12Format = `${time12format[0]} ${getAmArray()[position]}`;
    const selectedHour24format = hourTo24Format(newTime12Format);
    selectedDate.setHours(selectedHour24format);
    this.onDateSelected(selectedDate);
  };

  onDateSelected(selectedDate: Date) {
    this.setState({ selectedDate });
    if (this.props.onDateSelected) {
      this.props.onDateSelected(selectedDate);
    }
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row"
  },
  wheelPicker: {
    height: 150,
    width: null,
    flex: 1
  },
  dateWheelPicker: {
    height: 150,
    width: null,
    flex: 3
  }
});
