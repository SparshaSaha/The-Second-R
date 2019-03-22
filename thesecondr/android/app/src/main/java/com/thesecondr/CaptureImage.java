package com.thesecondr;

import android.*;
import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by sid on 30/8/18.
 */

public class CaptureImage extends ReactContextBaseJavaModule {
    static String mCurrentPhotoPath = null;
    public CaptureImage(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Camera";
    }

    private boolean checkAndGetPermission(){
        if(ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED){
            if(ActivityCompat.shouldShowRequestPermissionRationale(getCurrentActivity(),
                    Manifest.permission.CAMERA)){
                Log.d("Capture","rationale needed");
            }
            ActivityCompat.requestPermissions(getCurrentActivity(),
                    new String[]{Manifest.permission.CAMERA},0);
            return false;
        }
        return true;
    }

    @ReactMethod
    public void capture(Callback callback){
        Log.d("Capture","Capture");
        if(!checkAndGetPermission()) return;
        MainActivity.captureCallback = callback;
        captureFromNative(getCurrentActivity(),getReactApplicationContext());
    }

    public static void captureFromNative(Activity activity, Context context){
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        File photoFile = null;
        try {
            photoFile = createImageFile(activity);
        } catch (IOException ex) {
            // Error occurred while creating the File
            ex.printStackTrace();
        }
        Log.d("Capture",photoFile.getAbsolutePath());
        if(photoFile!=null){
            Uri photoURI = FileProvider.getUriForFile(context,
                    "com.example.android.fileprovider",
                    photoFile);
            takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
            activity.startActivityForResult(takePictureIntent, 1);
        }
    }

    private static File createImageFile(Activity activity) throws IOException {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = activity.getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
        mCurrentPhotoPath = image.getAbsolutePath();
        return image;
    }
}
