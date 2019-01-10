# ReactNativeWheelPicker WIP V2
<p>
<img src="http://img.shields.io/npm/v/react-native-wheel-picker-android.svg" />
<img src="https://img.shields.io/npm/dm/react-native-wheel-picker-android.svg" />
<img src="https://img.shields.io/npm/dt/react-native-wheel-picker-android.svg" />
</p>

A simple Wheel Picker for Android (For IOs is used PickerIOS)


## Installation
`yarn add react-native-wheel-picker-android`

![](./src/assets/pickerAndroid.gif)
![](./src/assets/pickerIos.gif)

# Usage

```js

import { WheelPicker } from 'react-native-wheel-picker-android'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const wheelPickerData = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

class MyPickers extends Component {
  state = {
    selectedItem: 0,
  }

  onItemSelected = selectedItem => {
    this.setState({ selectedItem })
  }

  onPress = () => {
    this.setState({ selectedItem: 3 })
  }

  render() {
    return (
      <View style={styles.container}>
      <Button title={'Select third element'} onPress={this.onPress}/>
      <Text>Selected position: {this.state.selectedItem}</Text>
      <WheelPicker 
        selectedItem={this.state.selectedItem}
        data={wheelPickerData} 
        onItemSelected={this.onItemSelected}/>
      </View>
    );
  }
}

module.exports = MyPicker;

```

## Props

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| onItemSelected | - | `func` | Returns selected position |
| data | - | `Array<string>` | Data array  |
| isCyclic | false | `bool` | Make Wheel Picker cyclic |
| selectedItemTextColor | black | `string` | Wheel Picker's selected Item text color  |
| selectedItemTextSize | 16 | `number` | Wheel Picker's selected Item text size  |
| selectedItemTextFontFamily | - | `font-family` | Wheel Picker's selected Item font  |
| itemTextColor | grey | `string` | Wheel Picker's Item Text Color  |
| itemTextSize | 16 | `number` | Wheel Picker's Item text size  |
| itemTextFontFamily | - | `font-family` | Wheel Picker's Item font  |
| selectedItem | 0 | `number` | Current item position |
| indicatorColor | black | `string` | Indicator color  |
| hideIndicator | - | `func` | Hide indicator |
| indicatorWidth | 1 | `number` | Indicator width |
| backgroundColor | transparent | `string` | Wheel Picker background color  |

## Questions or suggestions?

Feel free to [open an issue](https://github.com/ElekenAgency/ReactNativeWheelPicker/issues)
