/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { requireNativeComponent, PickerIOS, Picker, Text } from 'react-native'

type Props = {
  data: Array<string>,
  initPosition?: number,
  onItemSelected?: number => void
}

type State = {
  initPosition: number
}

export default class WheelPicker extends React.Component<Props, State> {
  static defaultProps = {
    style: {
      width: 200,
      height: 150,
    },
  }

  constructor(props: Props){
    super(props)
    this.state = {
      initPosition: props.initPosition
    }
  }

  onItemSelected = (value: any, index: number) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(index)
    }
    this.setState({initPosition: index})
  }

  render() {
    const data = this.props.data
    if (!data || !data.length < 0) return null
    return (
      <Picker
      {...this.props}
      selectedValue={data[this.state.initPosition]}
      onValueChange={this.onItemSelected}>
      {this.props.data.map((i, index) => <Picker.Item key={index} label={i} value={i} />)}
    </Picker>
    )
  }
}
