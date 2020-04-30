/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import WheelPicker from './WheelPicker'
import {
  hourTo24Format,
  hourTo12Format,
  pickerDateArray,
  getHoursArray,
  increaseDateByDays,
  getFiveMinutesArray,
  getAmArray,
} from './Utils'

const millisecondsPerDay = 1000 * 60 * 60 * 24
const HOUR = 60

type Props = {
  initDate: string,
  hours: Array<number>,
  minutes: Array<string>,
  onDateSelected: Date => void,
  startDate: string,
  daysCount: number,
  days: Array<number>,
  hideDate?: boolean,
  hideHours?: boolean,
  hideMinutes?: boolean,
  hideAM?: boolean,
  format?: string,
  initDayPosition?: number,
  initHourPosition?: number,
  initMinutesPosition?: number,
  isCyclicHours?: boolean,
  isCyclicMinutes?: boolean,
  onItemSelected?: Object => void,
}

type State = {
  selectedDate: Date,
  daysAfterSelectedDate: number,
  initDayInex: number,
  initHourInex: number,
  initMinuteInex: number,
  initAmInex: number,
}

export default class DatePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { startDate, minutes } = props
    const selectedDate = this.props.initDate
      ? new Date(this.props.initDate)
      : new Date()
    const time12format = hourTo12Format(selectedDate.getHours())
    const time24format = selectedDate.getHours()
    const millisBetween = selectedDate.getTime() - new Date().getTime()
    let millisBetweenStartDate
    let daysStartDate = 0
    if (startDate) {
      millisBetweenStartDate =
        new Date(startDate).getTime() - new Date().getTime()
      daysStartDate = millisBetweenStartDate / millisecondsPerDay
    }
    const days = millisBetween / millisecondsPerDay
    const daysAfterSelectedDate = Math.round(daysStartDate)
    const initDayInex = startDate
      ? Math.round(days) - Math.round(daysStartDate)
      : Math.round(days)
    const initHourInex = this.props.format24
      ? time24format
      : Number(time12format[0]) - 1
    const minutesCount = minutes ? minutes.length : 12
    const initMinuteInex = Math.round(
      selectedDate.getMinutes() / (HOUR / minutesCount)
    )

    const initAmInex = time12format[1] === 'AM' ? 0 : 1

    this.state = {
      daysAfterSelectedDate,
      initDayInex,
      selectedDate,
      initHourInex,
      initMinuteInex,
      initAmInex,
      dayPosition: this.props.initDayPosition,
      hourPosition: this.props.initHourPosition,
      minutePosition: this.props.initMinutesPosition,
    }
  }

  render() {
    const {
      startDate,
      days,
      daysCount,
      hours,
      minutes,
      format24,
      backgroundColor,
      hideDate,
      hideHours,
      hideMinutes,
      hideAM,
      format,
      initDayPosition,
      initHourPosition,
      initMinutesPosition,
      isCyclicHours,
      isCyclicMinutes,
    } = this.props
    const { initHourInex, initDayInex, initMinuteInex } = this.state
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {!hideDate && <WheelPicker
          style={styles.dateWheelPicker}
          {...this.props}
          data={days || pickerDateArray(startDate, daysCount, format)}
          onItemSelected={this.onDaySelected}
          initPosition={initDayPosition || initDayInex}
        />}
        {!hideHours && <WheelPicker
          style={styles.wheelPicker}
          {...this.props}
          isCyclic={isCyclicHours}
          data={hours || getHoursArray(format24)}
          onItemSelected={this.onHourSelected}
          initPosition={initHourPosition || initHourInex}
        />}
        {!hideMinutes && <WheelPicker
          style={styles.wheelPicker}
          {...this.props}
          isCyclic={isCyclicMinutes}
          data={minutes || getFiveMinutesArray()}
          onItemSelected={this.onMinuteSelected}
          initPosition={initMinutesPosition || initMinuteInex}
        />}
        {!this.props.format24 && !hideAM && this.renderAm()}
      </View>
    )
  }

  renderAm() {
    const { initAmInex } = this.state
    return (
      <WheelPicker
        style={styles.wheelPicker}
        {...this.props}
        data={getAmArray()}
        onItemSelected={this.onAmSelected}
        initPosition={initAmInex}
      />
    )
  }

  onDaySelected = (position: number) => {
    let selectedDate = this.state.selectedDate
    const daysAfterSelectedDate = this.state.daysAfterSelectedDate
    const hours = selectedDate.getHours()
    const minutes = selectedDate.getMinutes()

    const {
      startDate,
      days,
      daysCount
    } = this.props
    const data = days || pickerDateArray(startDate, daysCount, format)
    if (data[position] === 'Today') {
      selectedDate = new Date()
    } else {
      selectedDate = increaseDateByDays(
        new Date(),
        this.props.startDate
          ? daysAfterSelectedDate + position
          : position
      )
    }
    selectedDate.setHours(hours)
    selectedDate.setMinutes(minutes)
    this.onDateSelected(selectedDate, {dayPosition: position})
  }

  onHourSelected = (position: number) => {
    const selectedDate = this.state.selectedDate
    const { hours, format24 } = this.props
    const data = hours || getHoursArray(format24)
    if (this.props.format24) {
      selectedDate.setHours(Number(data[position]))
    } else {
      const time12format = hourTo12Format(selectedDate.getHours())
      const newTime12Format = `${data[position]} ${time12format[1]}`
      const selectedHour24format = hourTo24Format(newTime12Format)
      selectedDate.setHours(selectedHour24format)
    }
    this.onDateSelected(selectedDate, {hourPosition: position})
  }

  onMinuteSelected = (position: number) => {
    const selectedDate = this.state.selectedDate
    const { minutes } = this.props
    const data = minutes || getFiveMinutesArray()
    selectedDate.setMinutes(Number(data[position]))
    this.onDateSelected(selectedDate, {minutePosition: position})
  }

  onAmSelected = (position: number) => {
    const selectedDate = this.state.selectedDate
    const time12format = hourTo12Format(selectedDate.getHours())
    const newTime12Format = `${time12format[0]} ${getAmArray()[position]}`
    const selectedHour24format = hourTo24Format(newTime12Format)
    selectedDate.setHours(selectedHour24format)
    this.onDateSelected(selectedDate)
  }

  onDateSelected(selectedDate: Date, position) {
    this.setState({ selectedDate, ...position }, () => {
      if (this.props.onItemSelected) {
        this.props.onItemSelected({
          dayPosition: this.state.dayPosition,
          hourPosition: this.state.hourPosition,
          minutePosition: this.state.minutePosition,
        })
      }
    })
    if (this.props.onDateSelected) {
      this.props.onDateSelected(selectedDate)
    }
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  wheelPicker: {
    height: 150,
    width: null,
    flex: 1,
  },
  dateWheelPicker: {
    height: 150,
    width: null,
    flex: 3,
  },
})
