import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import WheelPicker from 'react-native-wheel-picker-android'
import moment from 'moment';

export default class DatePicker extends React.Component {
  constructor(props){
    super(props)
    this.selectedDate = this.props.initDate ? new Date(this.props.initDate) : new Date()
    let time12format = hourTo12Format(this.selectedDate.getHours())
    this.hours = this.props.hours ? this.props.hours : getHoursArray()
    this.minutes = this.props.minutes ? this.props.minutes : getFiveMinutesArray()
    this.initHourInex = time12format[0] - 1
    this.initMinuteInex = Math.round(this.selectedDate.getMinutes() / 5)
    this.initAmInex = time12format[1] === 'AM' ? 0 : 1
  }

  render() {
    return (
      <View style={styles.container}>
        <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCyclic
          isCurved
          visibleItemCount={6}
          data={this.hours}
          selectedItemTextColor={'black'}
          onItemSelected={(data)=> this.onHourSelected(data)}
          selectedItemPosition={this.initHourInex}
          />
        <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCyclic
          isCurved
          visibleItemCount={6}
          data={this.minutes}
          selectedItemTextColor={'black'}
          onItemSelected={(data)=> this.onMinuteSelected(data)}
          selectedItemPosition={this.initMinuteInex}
          />
        <WheelPicker
          style={styles.wheelPicker}
          isAtmospheric
          isCurved
          visibleItemCount={6}
          data={getAmArray()}
          selectedItemTextColor={'black'}
          onItemSelected={(data)=> this.onAmSelected(data)}
          selectedItemPosition={this.initAmInex}
          />
      </View>
    )
  }

  onHourSelected(event){
    let time12format = hourTo12Format(this.selectedDate.getHours())
    let newTime12Format = event.data + ' ' + time12format[1]
    let selectedHour24format = hourTo24Format(newTime12Format)
    this.selectedDate.setHours(selectedHour24format)
    this.onDateSelected()
  }

  onMinuteSelected(event){
    this.selectedDate.setMinutes(event.data)
    this.onDateSelected()
  }

  onAmSelected(event){
    let time12format = hourTo12Format(this.selectedDate.getHours())
    let newTime12Format = time12format[0] + ' ' + event.data
    let selectedHour24format = hourTo24Format(newTime12Format)
    this.selectedDate.setHours(selectedHour24format)
    this.onDateSelected()
  }

  onDateSelected(){
    if (this.props.onDateSelected) {
      this.props.onDateSelected(this.selectedDate)
    }
  }

}

DatePicker.propTypes = {
  initDate: React.PropTypes.string,
  onDateSelected: React.PropTypes.func,
  hours: React.PropTypes.array,
  minutes: React.PropTypes.array,
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  wheelPicker: {
    height: 150,
    width: null,
    flex:1,
  },
});

// it takes in format '12 AM' and return 24 format
function hourTo24Format(hour) {
  return parseInt(moment(hour, ['h A']).format('H'), 10);
}

// it takes in format 23 and return [11,'PM'] format
function hourTo12Format(hour) {
  let currDate = new Date()
  currDate.setHours(hour)
  return dateTo12Hour(currDate.toISOString())
}

const dateTo12Hour = dateString => {
  let localDate = new Date(dateString);
  let hour = localDate.getHours();
  if (hour === 12 ) {
    return [('12'),('PM')];
  } if (hour === 0 ) {
    return [('12'),('AM')];
  }
  let afterMidday = hour % 12 === hour;
  hour = afterMidday ? hour : hour % 12;
  let amPm = afterMidday ? 'AM' : 'PM';
  return [(hour.toString()),(amPm)];
}

function getHoursArray(){
  let arr = []
  for (var i = 1; i < 13; i++) {
    arr.push(i)
  }
  return arr
}

function getFiveMinutesArray(){
  let arr = []
  arr.push('00')
  arr.push('05')
  for (var i = 10; i < 60; i = i + 5) {
    arr.push('' + i)
  }
  return arr
}

function getAmArray(){
  let arr = []
  arr.push('AM')
  arr.push('PM')
  return arr
}
