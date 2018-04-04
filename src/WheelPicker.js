/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { requireNativeComponent } from 'react-native'

const WheelPickerView = requireNativeComponent('WheelPicker', WheelPicker)

type Props = {
  onItemSelected: any => void,
  data: Array<any>,
  isCurved?: boolean,
  isCyclic?: boolean,
  isAtmospheric?: boolean,
  selectedItemTextColor?: string,
  itemSpace?: number,
  visibleItemCount?: number,
  renderIndicator?: boolean,
  indicatorColor?: string,
  isCurtain?: boolean,
  curtainColor?: string,
  itemTextColor?: string,
  itemTextSize?: number,
  itemTextFontFamily?: string,
  selectedItemPosition?: number,
  backgroundColor?: string,
}

type State = { selectedItemPosition: number }

export default class WheelPicker extends React.Component<Props, State> {
  state = {
    selectedItemPosition: 0,
  }

  static defaultProps = {
    style: {
      width: 200,
      height: 150,
    },
  }

  onItemSelected = (event: any) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(event.nativeEvent)
    }
  }

  componentDidMount() {
    this.setState({ selectedItemPosition: this.props.selectedItemPosition })
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ selectedItemPosition: nextProps.selectedItemPosition })
  }

  render() {
    return (
      <WheelPickerView
        {...this.props}
        onChange={this.onItemSelected}
        selectedItemPosition={this.state.selectedItemPosition}
      />
    )
  }
}
