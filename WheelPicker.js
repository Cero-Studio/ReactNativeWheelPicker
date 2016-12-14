import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, DeviceEventEmitter,View } from 'react-native';

var WheelPickerView = requireNativeComponent('WheelPicker', WheelPicker);
class WheelPicker extends React.Component {
  constructor() {
    super();
    this.onItemSelected = this.onItemSelected.bind(this);
  }
  componentWillMount() {
         DeviceEventEmitter.addListener('itemSelected', this.onItemSelected);
     }

     componentWillUnmount() {
         DeviceEventEmitter.removeListener('itemSelected', this.onItemSelected);
     }
  onItemSelected(event) {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(event);
    }
  }

  render() {
     return (
       <WheelPickerView
         {...this.props}
         onItemSelected={this.onItemSelected}
         data={this.props.data}
         isCurved={this.props.isCurved}
         isCyclic={this.props.isCyclic}
         isAtmospheric={this.props.isAtmospheric}
         selectedItemTextColor={this.props.selectedItemTextColor}
         itemSpace={this.props.itemSpace}
         visibleItemCount={this.props.visibleItemCount}
         renderIndicator={this.props.renderIndicator}
         indicatorColor={this.props.indicatorColor}
         isCurtain={this.props.isCurtain}
         curtainColor={this.props.curtainColor}
         itemTextColor={this.props.itemTextColor}
         itemTextSize={this.props.itemTextSize}
         selectedItemPosition={this.props.selectedItemPosition}
         backgroundColor={this.props.backgroundColor}
         />
     );
   }
}
WheelPicker.propTypes = {
  ...View.propTypes,
      onItemSelected: PropTypes.func,
      data: PropTypes.array,
      isCurved: PropTypes.bool,
      isCyclic: PropTypes.bool,
      isAtmospheric: PropTypes.bool,
      selectedItemTextColor: PropTypes.string,
      itemSpace: PropTypes.number,
      visibleItemCount: PropTypes.number,
      renderIndicator: PropTypes.bool,
      indicatorColor: PropTypes.string,
      isCurtain: PropTypes.bool,
      curtainColor: PropTypes.string,
      itemTextColor: PropTypes.string,
      itemTextSize: PropTypes.number,
      selectedItemPosition: PropTypes.number,
      backgroundColor: PropTypes.string,
};
module.exports = WheelPicker;
