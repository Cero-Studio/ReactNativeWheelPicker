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

type Event = {
  data: string | number,
  position: number,
}

type Props = {
  initDate: string,
  onTimeSelected: Date => void,
  hours: Array<number>,
  minutes: Array<string>,
  format24: boolean,
  onDateSelected: Date => void,
  startDate: string,
  daysCount: number,
  days: Array<number>,
  itemTextColor?: string,
  selectedItemTextColor?: string,
  backgroundColor?: string,
  hideDate?: boolean,
  hideHours?: boolean,
  hideMinutes?: boolean,
  hideAM?: boolean,
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
      itemTextColor = 'grey',
      selectedItemTextColor = 'black',
      backgroundColor,
      hideDate,
      hideHours,
      hideMinutes,
      hideAM,
    } = this.props
    const { initHourInex, initDayInex, initMinuteInex } = this.state
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {!hideDate && <WheelPicker
          style={styles.dateWheelPicker}
          isAtmospheric
          isCurved
          visibleItemCount={8}
          data={days || pickerDateArray(startDate, daysCount)}
          itemTextColor={itemTextColor}
          selectedItemTextColor={selectedItemTextColor}
          onItemSelected={this.onDaySelected}
          selectedItemPosition={initDayInex}
        />}
        {!hideHours && <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCyclic
          isCurved
          visibleItemCount={8}
          data={hours || getHoursArray(format24)}
          itemTextColor={itemTextColor}
          selectedItemTextColor={selectedItemTextColor}
          onItemSelected={this.onHourSelected}
          selectedItemPosition={initHourInex}
        />}
        {!hideMinutes && <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCyclic
          isCurved
          visibleItemCount={8}
          data={minutes || getFiveMinutesArray()}
          itemTextColor={itemTextColor}
          selectedItemTextColor={selectedItemTextColor}
          onItemSelected={this.onMinuteSelected}
          selectedItemPosition={initMinuteInex}
        />}
        {!this.props.format24 && !hideAM && this.renderAm()}
      </View>
    )
  }

  renderAm() {
    const {
      itemTextColor = 'grey',
      selectedItemTextColor = 'black',
    } = this.props
    const { initAmInex } = this.state
    return (
      <WheelPicker
        style={styles.wheelPicker}
        isAtmospheric
        isCurved
        visibleItemCount={8}
        data={getAmArray()}
        itemTextColor={itemTextColor}
        selectedItemTextColor={selectedItemTextColor}
        onItemSelected={this.onAmSelected}
        selectedItemPosition={initAmInex}
      />
    )
  }

  onDaySelected = (event: Object) => {
    let selectedDate = this.state.selectedDate
    const daysAfterSelectedDate = this.state.daysAfterSelectedDate
    const hours = selectedDate.getHours()
    const minutes = selectedDate.getMinutes()
    if (event.data === 'Today') {
      selectedDate = new Date()
    } else {
      selectedDate = increaseDateByDays(
        new Date(),
        this.props.startDate
          ? daysAfterSelectedDate + event.position
          : event.position
      )
    }
    selectedDate.setHours(hours)
    selectedDate.setMinutes(minutes)
    this.onDateSelected(selectedDate)
  }

  onHourSelected = (event: Event) => {
    const selectedDate = this.state.selectedDate
    if (this.props.format24) {
      selectedDate.setHours(Number(event.data))
    } else {
      const time12format = hourTo12Format(selectedDate.getHours())
      const newTime12Format = `${event.data} ${time12format[1]}`
      const selectedHour24format = hourTo24Format(newTime12Format)
      selectedDate.setHours(selectedHour24format)
    }
    this.onDateSelected(selectedDate)
  }

  onMinuteSelected = (event: Event) => {
    const selectedDate = this.state.selectedDate
    selectedDate.setMinutes(Number(event.data))
    this.onDateSelected(selectedDate)
  }

  onAmSelected = (event: Event) => {
    const selectedDate = this.state.selectedDate
    const time12format = hourTo12Format(selectedDate.getHours())
    const newTime12Format = `${time12format[0]} ${event.data}`
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  wheelPicker: {
    height: 150,
    width: null,
    flex: 1,
  },
  dateWheelPicker: {
    height: 200,
    width: null,
    flex: 3,
  },
})
