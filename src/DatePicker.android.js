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
  format?: string
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
    } = this.props
    const { initHourInex, initDayInex, initMinuteInex } = this.state
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {!hideDate && <WheelPicker
          style={styles.dateWheelPicker}
          {...this.props}
          data={days || pickerDateArray(startDate, daysCount, format)}
          onItemSelected={this.onDaySelected}
          initPosition={initDayInex}
        />}
        {!hideHours && <WheelPicker
          style={styles.wheelPicker}
          {...this.props}
          isCyclic
          data={hours || getHoursArray(format24)}
          onItemSelected={this.onHourSelected}
          initPosition={initHourInex}
        />}
        {!hideMinutes && <WheelPicker
          style={styles.wheelPicker}
          {...this.props}
          isCyclic
          data={minutes || getFiveMinutesArray()}
          onItemSelected={this.onMinuteSelected}
          initPosition={initMinuteInex}
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
    let selectedDate = new Date(this.state.selectedDate.getTime())
    const daysAfterSelectedDate = this.state.daysAfterSelectedDate
    const hours = selectedDate.getHours()
    const minutes = selectedDate.getMinutes()

    const {
      startDate,
      days,
      daysCount,
      format,
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
    this.onDateSelected(selectedDate)
  }

  onHourSelected = (position: number) => {
    const selectedDate = new Date(this.state.selectedDate.getTime())
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
    this.onDateSelected(selectedDate)
  }

  onMinuteSelected = (position: number) => {
    const selectedDate = new Date(this.state.selectedDate.getTime())
    const { minutes } = this.props
    const data = minutes || getFiveMinutesArray()
    selectedDate.setMinutes(Number(data[position]))
    this.onDateSelected(selectedDate)
  }

  onAmSelected = (position: number) => {
    const selectedDate = new Date(this.state.selectedDate.getTime())
    const time12format = hourTo12Format(selectedDate.getHours())
    const newTime12Format = `${time12format[0]} ${getAmArray()[position]}`
    const selectedHour24format = hourTo24Format(newTime12Format)
    selectedDate.setHours(selectedHour24format)
    this.onDateSelected(selectedDate)
  }

  onDateSelected(selectedDate: Date) {
    this.setState({ selectedDate })
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
