/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { DatePickerIOS, StyleSheet, Dimensions } from 'react-native'

type Props = {
  onDateSelected: Date => void,
  initDate: Date
}

type State = {
  chosenDate: Date
}

export default class DatePicker extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = { chosenDate: props.initDate || new Date() }
  }

  setDate = (newDate) => {
    this.setState({chosenDate: newDate})
    const { onDateSelected } = this.props
    if (onDateSelected) onDateSelected(newDate)
  }

  render(){
    return (
        <DatePickerIOS
          style={styles.picker}
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          {...this.props}
        />
    )
  }
}

let styles = StyleSheet.create({
  picker: {
    width: Dimensions.get('screen').width
  },
})
