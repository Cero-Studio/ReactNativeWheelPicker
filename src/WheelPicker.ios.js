/**
 * @prettier
 * @flow
 * */

import React from 'react';
import { requireNativeComponent, Picker, Text } from 'react-native';

type Props = {
  data: Array<string>,
  selectedItem?: number,
  onItemSelected?: number => void,
  label?: (value: string) => string,
};

type State = {
  selectedItem: number,
};

export default class WheelPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem || 0,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.selectedItem !== this.props.selectedItem) {
      this.setState({ selectedItem: this.props.selectedItem });
    }
  }

  onItemSelected = (value: any, index: number) => {
    const { onItemSelected } = this.props;
    if (onItemSelected) {
      onItemSelected(index);
    }
    this.setState({ selectedItem: index });
  };

  render() {
    const { data, selectedItem, onItemSelected, label, ...pickerProps } = this.props;

    if (!data) {
      return null;
    }

    return (
      <Picker {...pickerProps} selectedValue={data[this.state.selectedItem]} onValueChange={this.onItemSelected}>
        {this.props.data.map((i, index) => (
          <Picker.Item key={index} label={label ? label(i) : i} value={i} />
        ))}
      </Picker>
    );
  }
}
