/**
 * @prettier
 * @flow
 * */

import React from "react";
import { requireNativeComponent, View } from "react-native";

const WheelPickerView = requireNativeComponent("WheelPicker", null);

type IProps = {
  data: Array<string>;
  isCyclic?: boolean;
  selectedItemTextColor?: string;
  selectedItemTextSize?: number;
  indicatorWidth?: number;
  hideIndicator?: boolean;
  indicatorColor?: string;
  itemTextColor?: string;
  itemTextSize?: number;
  selectedItem?: number;
  backgroundColor?: string;
  onItemSelected?: (number) => void;
  disabled?: boolean;
};

export default class WheelPicker extends React.Component<IProps> {
  static defaultProps = {
    style: {
      width: "auto",
      height: 150,
    },
  };

  onItemSelected = (event: any) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(event.nativeEvent.position);
    }
  };

  render() {
    const { isCyclic = false, data } = this.props;
    return (
      <View pointerEvents={this.props.disabled ? "none" : "auto"}>
        <WheelPickerView
          {...this.props}
          isCyclic={data.length > 2 ? isCyclic : false}
          onChange={this.onItemSelected}
        />
      </View>
    );
  }
}
