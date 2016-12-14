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
| horizontal | true | `bool` | If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. |
| loop | true | `bool` | Set to `false` to disable continuous loop mode. |
| index | 0 | `number` | Index number of initial slide. |
| showsButtons | false | `bool` | Set to `true` make control buttons visible. |
| autoplay | false | `bool` | Set to `true` enable auto play mode. |

### data

An array of options. This should be provided with an __array of strings__ or __array of numbers__.


### onItemSelected(event)

Callback with event in the form `event = { data: 1, position: 0 }`

## Questions or suggestions?

Feel free to [open an issue](https://github.com/ElekenAgency/ReactNativeWheelPicker/issues)
