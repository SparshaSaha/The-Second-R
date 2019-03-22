package com.thesecondr;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by sid on 7/9/18.
 */

public class Caller extends ReactContextBaseJavaModule {
    public Caller(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Caller";
    }

    @ReactMethod
    public void call(String number){
        Intent callIntent = new Intent(Intent.ACTION_DIAL);
        callIntent.setData(Uri.parse("tel:"+number));
        getCurrentActivity().startActivity(callIntent);
    }

}
