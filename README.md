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
  View
} from 'react-native';

const wheelPickerData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];

class MyPickers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WheelPicker
           onItemSelected={this.onItemSelected}
           data={wheelPickerData}
           style={styles.wheelPicker}/>
      </View>
    );
  }

  onItemSelected(position){
    // do something
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wheelPicker: {
    width: 200,
    height: 150
  }
});

module.exports = MyPickers;

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
