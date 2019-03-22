package com.thesecondr;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by sid on 9/8/18.
 */

public class NativeModulePackages implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new Toast(reactContext));
        modules.add(new GoogleSignin(reactContext));
        modules.add(new CaptureImage(reactContext));
        modules.add(new SelectImage(reactContext));
        modules.add(new ImageUploader(reactContext));
        modules.add(new Caller(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
