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
  selectedHourIndex: number,
  selectedMinuteIndex: number,
  selectedAmIndex: number,
}

export default class TimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { initDate, format24, minutes } = props
    const selectedDate = initDate ? new Date(initDate) : new Date()
    const time12format = hourTo12Format(selectedDate.getHours())
    const time24format = selectedDate.getHours()
    const hours = this.props.hours || getHoursArray(format24)
    const selectedHourIndex = format24 ? time24format : Number(time12format[0]) - 1
    const minutesCount = minutes ? minutes.length : 12

    const selectedMinuteIndex = Math.round(
      selectedDate.getMinutes() / (HOUR / minutesCount)
    )
    const selectedAmIndex = time12format[1] === AM ? 0 : 1
    this.state = {
      selectedDate,
      hours,
      minutes: minutes || getFiveMinutesArray(),
      selectedHourIndex,
      selectedMinuteIndex,
      selectedAmIndex,
    }
  }

  render() {
    const { hours, selectedHourIndex, minutes, selectedMinuteIndex } = this.state

    return (
      <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
        <WheelPicker
          isCyclic
          // style={styles.wheelPicker}
          {...this.props}
          data={hours}
          onItemSelected={this.onHourSelected}
          selectedItem={selectedHourIndex}
          initPosition={selectedHourIndex}
        />
        <WheelPicker
          // style={styles.wheelPicker}
          isCyclic
          {...this.props}
          data={minutes}
          onItemSelected={this.onMinuteSelected}
          selectedItem={selectedMinuteIndex}
          initPosition={selectedMinuteIndex}
        />
        {!this.props.format24 && this.renderAm()}
      </View>
    )
  }

  renderAm() {
    const { itemTextColor, selectedItemTextColor } = this.props
    const { selectedAmIndex } = this.state
    return (
      <WheelPicker
        style={styles.wheelPicker}
        {...this.props}
        data={getAmArray()}
        onItemSelected={this.onAmSelected}
        selectedItem={selectedAmIndex}
        initPosition={selectedAmIndex}
      />
    )
  }

  onHourSelected = (position: number) => {
    this.setState({selectedHourIndex: position})
    const { selectedDate, hours } = this.state
    const selectedHour = hours[position]

    if (this.props.format24) {
      selectedDate.setHours(Number(selectedHour))
    } else {
      const time12format = hourTo12Format(selectedDate.getHours())
      const newTime12Format = `${selectedHour} ${time12format[1]}`
      const selectedHour24format = hourTo24Format(newTime12Format)
      selectedDate.setHours(selectedHour24format)
    }
    this.onTimeSelected(selectedDate)
  }

  onMinuteSelected = (position: number) => {
    this.setState({selectedMinuteIndex: position})
    const selectedDate = this.state.selectedDate
    selectedDate.setMinutes(Number(this.state.minutes[position]))
    this.onTimeSelected(selectedDate)
  }

  onAmSelected = (position: number) => {
    this.setState({selectedAmIndex: position})
    const selectedDate = this.state.selectedDate
    const time12format = hourTo12Format(selectedDate.getHours())
    const newTime12Format = `${time12format[0]} ${getAmArray()[position]}`
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
    // alignItems: 'center',
    flexDirection: 'row',
  },
  wheelPicker: {
    height: 150,
    width: 150,
    flex: 1,
  },
})