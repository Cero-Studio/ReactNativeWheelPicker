package com.wheelpicker;

/**
 * Created by Eleken. on 13.12.16.
 */
import com.aigestudio.wheelpicker.WheelPicker;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.text.ReactFontManager;
import android.graphics.Color;
import android.graphics.Typeface;
import java.util.ArrayList;
import java.util.List;

public class WheelPickerManager extends SimpleViewManager<WheelPicker>  implements WheelPicker.OnItemSelectedListener{

    public static final String REACT_CLASS = "WheelPicker";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WheelPicker createViewInstance(ThemedReactContext context) {
        WheelPicker wheelPicker = new WheelPicker(context);
        wheelPicker.setOnItemSelectedListener(this);
        return wheelPicker;
    }

    @ReactProp(name = "data")
    public void setData(WheelPicker wheelPicker, ReadableArray data) {
        if (wheelPicker!=null){
            List<String> emptyList = new ArrayList<>();
            try {
                List<Integer> dataInt = new ArrayList<>();
                for (int i = 0; i <data.size() ; i++) {
                    dataInt.add(data.getInt(i));
                }
                wheelPicker.setData(dataInt);
            } catch (Exception e){
                try {
                    List<String> dataString = new ArrayList<>();
                    for (int i = 0; i <data.size() ; i++) {
                        dataString.add(data.getString(i));
                    }
                    wheelPicker.setData(dataString);
                } catch (Exception ex){
                    ex.printStackTrace();
                    wheelPicker.setData(emptyList);
                }
            }
        }
    }

    @ReactProp(name = "isCurved")
    public void setCurved(WheelPicker wheelPicker, Boolean isCurved) {
        if (wheelPicker!=null){
            wheelPicker.setCurved(isCurved);
        }
    }

    @ReactProp(name = "isCyclic")
    public void setCyclic(WheelPicker wheelPicker, Boolean isCyclic) {
        if (wheelPicker!=null){
            wheelPicker.setCyclic(isCyclic);
        }
    }

    @ReactProp(name = "isAtmospheric")
    public void setAtmospheric(WheelPicker wheelPicker, Boolean isAtmospheric) {
        if (wheelPicker!=null){
            wheelPicker.setAtmospheric(isAtmospheric);
        }
    }

    @ReactProp(name = "selectedItemTextColor")
    public void setSelectedItemTextColor(WheelPicker wheelPicker, String selectedItemTextColor) {
        if (wheelPicker!=null){
            wheelPicker.setSelectedItemTextColor(Color.parseColor(selectedItemTextColor));
        }
    }

    @ReactProp(name = "itemSpace")
    public void setItemSpace(WheelPicker wheelPicker, int itemSpace) {
        if (wheelPicker!=null){
            wheelPicker.setItemSpace(itemSpace);
        }
    }

    @ReactProp(name = "visibleItemCount")
    public void setVisibleItemCount(WheelPicker wheelPicker, int visibleItemCount) {
        if (wheelPicker!=null){
            wheelPicker.setVisibleItemCount(visibleItemCount);
        }
    }

    @ReactProp(name = "renderIndicator")
    public void setIndicator(WheelPicker wheelPicker, Boolean renderIndicator) {
        if (wheelPicker!=null){
            wheelPicker.setIndicator(renderIndicator);
        }
    }

    @ReactProp(name = "indicatorColor")
    public void setIndicatorColor(WheelPicker wheelPicker, String indicatorColor) {
        if (wheelPicker!=null){
            wheelPicker.setIndicatorColor(Color.parseColor(indicatorColor));
        }
    }

    @ReactProp(name = "isCurtain")
    public void setCurtain(WheelPicker wheelPicker, Boolean isCurtain) {
        if (wheelPicker!=null){
            wheelPicker.setCurtain(isCurtain);
        }
    }

    @ReactProp(name = "curtainColor")
    public void setCurtainColor(WheelPicker wheelPicker, String curtainColor) {
        if (wheelPicker!=null){
            wheelPicker.setCurtainColor(Color.parseColor(curtainColor));
        }
    }

    @ReactProp(name = "itemTextColor")
    public void setItemTextColor(WheelPicker wheelPicker, String itemTextColor) {
        if (wheelPicker!=null){
            wheelPicker.setItemTextColor(Color.parseColor(itemTextColor));
        }
    }

    @ReactProp(name = "itemTextSize")
    public void setItemTextSize(WheelPicker wheelPicker, int itemTextSize) {
        if (wheelPicker!=null){
            wheelPicker.setItemTextSize(itemTextSize);
        }
    }

    @ReactProp(name = "itemTextFontFamily")
    public void setSelectedItemPosition(WheelPicker wheelPicker, String itemTextFontFamily) {
      if (wheelPicker!=null){
        Typeface typeface = ReactFontManager.getInstance().getTypeface(itemTextFontFamily, Typeface.NORMAL, wheelPicker.getContext().getAssets());
        wheelPicker.setTypeface(typeface);
      }
    }

    @ReactProp(name = "selectedItemPosition")
    public void setSelectedItemPosition(WheelPicker wheelPicker, int selectedItemPosition) {
        if (wheelPicker!=null){
            wheelPicker.setSelectedItemPosition(selectedItemPosition);
        }
    }

    @ReactProp(name = "backgroundColor")
    public void setBackgroundColor(WheelPicker wheelPicker, String backgroundColor) {
        if (wheelPicker!=null){
            wheelPicker.setBackgroundColor(Color.parseColor(backgroundColor));
        }
    }

    @Override
    public void onItemSelected(WheelPicker picker, Object data, int position) {
        WritableMap event = Arguments.createMap();
        try {
            event.putString("data", (String) data);
        } catch (Exception e){
            e.printStackTrace();
            try {
                event.putInt("data", (Integer) data);
            } catch (Exception ex){
                ex.printStackTrace();
            }
        }
        event.putInt("position", position);
        ((ReactContext) picker.getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
            picker.getId(),
            "topChange",
            event);
    }
}
