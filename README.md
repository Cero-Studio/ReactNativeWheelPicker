# ReactNativeWheelPicker
A simple Wheel Picker for Android

## Installation Android
1. `npm install --save react-native-wheel-picker-android`
2. In `android/settings.gradle`

    ```gradle
    ...
    include ':ReactNativeWheelPicker', ':app'
    project(':ReactNativeWheelPicker').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-wheel-picker-android/android')
    ```

3. In `android/app/build.gradle`

    ```gradle
    ...
    dependencies {
        ...
        compile project(':ReactNativeWheelPicker')
    }
    ```

4. Register module (in MainActivity.java)

    4.1. With RN < 0.19.0

        ```java
        import com.wheelpicker.WheelPickerPackage; // <----- import

        public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
          ......

          @Override
          protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            mReactRootView = new ReactRootView(this);

            mReactInstanceManager = ReactInstanceManager.builder()
              .setApplication(getApplication())
              .setBundleAssetName("index.android.bundle")
              .setJSMainModuleName("index.android")
              .addPackage(new MainReactPackage())
              .addPackage(new WheelPickerPackage())              // <------ add here
              .setUseDeveloperSupport(BuildConfig.DEBUG)
              .setInitialLifecycleState(LifecycleState.RESUMED)
              .build();

            mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

            setContentView(mReactRootView);
          }
          ......
        }
        ```

    4.2. With RN >= 0.19.0

        ```java
        import com.wheelpicker.WheelPickerPackage; // <----- import

        public class MainActivity extends ReactActivity {
            ...

            @Override
            protected List<ReactPackage> getPackages() {
              return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new WheelPickerPackage() // <------ add here
              );
            }
        }
        ```

## Usage

```js

import WheelPicker from 'react-native-wheel-picker-android';
...

  render() {
  let arr = [1,2,3];
    return (
      <WheelPicker
          onItemSelected={(event)=>{console.log(event)}}
          isCurved
          isCyclic
          data={arr}
          style={{width:300, height: 300}}/>
    );
  }
```

## Props

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| onItemSelected | null | `func` | Callback when user select item {data: 'itemData', position: 'itemPosition'} |
| data | default string array | `array` | Data array (string or number type)  |
| isCurved | false | `bool` | Make Wheel Picker curved |
| isCyclic | false | `bool` | Make Wheel Picker cyclic |
| isAtmospheric | false | `bool` | Design Wheel Picker's items  |
| selectedItemTextColor | grey | `string` | Wheel Picker's selected Item Text Color  |
| itemSpace | 20 | `number` | Wheel Picker's items spacing |
| visibleItemCount | 7 | `number` | Wheel Picker's items max visible count  |
| renderIndicator | false | `bool` | Show Wheel Picker indicator |
| indicatorColor | transparent | `string` | Indicator color  |
| isCurtain | false | `bool` | Wheel Picker curtain  |
| curtainColor | transparent | `string` | Wheel Picker curtain color  |
| itemTextColor | grey | `string` | Wheel Picker's items color  |
| itemTextSize | 20 | `number` |  Wheel Picker's items text size  |
| selectedItemPosition | null | `number` | Select current item position |
| backgroundColor | transparent | `string` | Wheel Picker background color  |

### data

An array of options. This should be provided with an __array of strings__ or __array of numbers__.


### onItemSelected(event)

Callback with event in the form `event = { data: 1, position: 0 }`

## Questions or suggestions?

Feel free to [open an issue](https://github.com/ElekenAgency/ReactNativeWheelPicker/issues)
