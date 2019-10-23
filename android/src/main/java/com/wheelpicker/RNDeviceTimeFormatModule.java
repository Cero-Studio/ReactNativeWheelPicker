package com.wheelpicker;

import android.text.format.DateFormat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNDeviceTimeFormatModule extends ReactContextBaseJavaModule {

  @Override
  public String getName() {
    return "RNDeviceTimeFormat";
  }

  private final ReactApplicationContext reactContext;

  public RNDeviceTimeFormatModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @ReactMethod
  public void is24HourFormat(final Promise promise) {
    try {
      promise.resolve(DateFormat.is24HourFormat(reactContext));
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }
}