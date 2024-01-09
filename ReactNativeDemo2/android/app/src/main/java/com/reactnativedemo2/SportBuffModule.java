package com.reactnativedemo2;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SportBuffModule extends ReactContextBaseJavaModule {

    public SportBuffModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SportBuffWrapper";
    }

    @ReactMethod
    public void initializeSportBuff() {
        Log.d("Hello", "Hey");
    }
}