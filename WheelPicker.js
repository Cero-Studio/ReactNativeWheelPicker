'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent,View } from 'react-native';

var WheelPickerView = requireNativeComponent('WheelPicker', WheelPicker);
class WheelPicker extends React.Component {
  constructor(props) {
   super(props);
   this.onItemSelected = this.onItemSelected.bind(this);
   this.state = {
     selectedItemPosition: 0
   }
 }
 onItemSelected(event: Event) {
   if (!this.props.onItemSelected) {
     return;
   }
   this.props.onItemSelected(event.nativeEvent);
  }

  componentDidMount() {
     this.setState({ selectedItemPosition: this.props.selectedItemPosition })
   }

   componentWillReceiveProps(nextProps){
     this.setState({ selectedItemPosition: nextProps.selectedItemPosition })
   }

  render() {
     return (
       <WheelPickerView
         {...this.props}
         onChange={this.onItemSelected}
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
         itemTextFontFamily={this.props.itemTextFontFamily}
         selectedItemPosition={this.state.selectedItemPosition}
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
      itemTextFontFamily: PropTypes.string,
      selectedItemPosition: PropTypes.number,
      backgroundColor: PropTypes.string,
};
module.exports = WheelPicker;
