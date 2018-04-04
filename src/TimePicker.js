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
  getHoursArray,
  getFiveMinutesArray,
  getAmArray,
} from './Utils'

const AM = 'AM'
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
}

type State = {
  selectedDate: Date,
  hours: Array<number>,
  minutes: Array<string>,
  initHourInex: number,
  initMinuteInex: number,
  initAmInex: number,
}

export default class TimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { initDate, format24, minutes } = props
    const selectedDate = initDate ? new Date(initDate) : new Date()
    const time12format = hourTo12Format(selectedDate.getHours())
    const time24format = selectedDate.getHours()
    const hours = this.props.hours || getHoursArray(format24)
    const initHourInex = format24 ? time24format : Number(time12format[0]) - 1
    const minutesCount = minutes ? minutes.length : 12

    const initMinuteInex = Math.round(
      selectedDate.getMinutes() / (HOUR / minutesCount)
    )
    const initAmInex = time12format[1] === AM ? 0 : 1
    this.state = {
      selectedDate,
      hours,
      minutes: minutes || getFiveMinutesArray(),
      initHourInex,
      initMinuteInex,
      initAmInex,
    }
  }

  render() {
    const { hours, initHourInex, minutes, initMinuteInex } = this.state
    return (
      <View style={styles.container}>
        <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCyclic
          isCurved
          visibleItemCount={6}
          data={hours}
          selectedItemTextColor={'black'}
          onItemSelected={this.onHourSelected}
          selectedItemPosition={initHourInex}
        />
        <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCyclic
          isCurved
          visibleItemCount={6}
          data={minutes}
          selectedItemTextColor={'black'}
          onItemSelected={this.onMinuteSelected}
          selectedItemPosition={initMinuteInex}
        />
        {!this.props.format24 && this.renderAm()}
      </View>
    )
  }

  renderAm() {
    const { initAmInex } = this.state
    return (
      <WheelPicker
        style={styles.wheelPicker}
        isAtmospheric
        isCurved
        visibleItemCount={8}
        data={getAmArray()}
        selectedItemTextColor={'black'}
        onItemSelected={this.onAmSelected}
        selectedItemPosition={initAmInex}
      />
    )
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
    this.onTimeSelected(selectedDate)
  }

  onMinuteSelected = (event: Event) => {
    const selectedDate = this.state.selectedDate
    selectedDate.setMinutes(Number(event.data))
    this.onTimeSelected(selectedDate)
  }

  onAmSelected = (event: Event) => {
    const selectedDate = this.state.selectedDate
    const time12format = hourTo12Format(selectedDate.getHours())
    const newTime12Format = `${time12format[0]} ${event.data}`
    const selectedHour24format = hourTo24Format(newTime12Format)
    selectedDate.setHours(selectedHour24format)
    this.onTimeSelected(selectedDate)
  }

  onTimeSelected(selectedDate: Date) {
    if (this.props.onTimeSelected) {
      this.props.onTimeSelected(selectedDate)
    }
  }
}

const styles = StyleSheet.create({
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
})
