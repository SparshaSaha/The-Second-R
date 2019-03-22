package com.thesecondr;

import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by sid on 30/8/18.
 */

public class SelectImage extends ReactContextBaseJavaModule {

    public SelectImage(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImageSelector";
    }

    @ReactMethod
    public void select(Callback callback){
        MainActivity.selectCallback = callback;
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_GET_CONTENT);
        intent.setType("image/*");
        getCurrentActivity().startActivityForResult(intent, 2);
    }
}
