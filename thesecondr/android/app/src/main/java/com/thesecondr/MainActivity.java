package com.thesecondr;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.tasks.Task;
import com.facebook.react.bridge.Callback;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    static Callback signInCallback, captureCallback, selectCallback;
    @Override
    protected String getMainComponentName() {
        return "thesecondr";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 0){
            //GOOGLE SIGN CODE 0
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            GoogleSignInAccount account = task.getResult();
            android.widget.Toast.makeText(getApplicationContext(), account.getEmail(),android.widget.Toast.LENGTH_LONG).show();
            signInCallback.invoke(account.getDisplayName(),account.getEmail());
        }
        else if(requestCode == 1){
            //CAPTURE IMAGE
            Log.d("res",resultCode + "");
            if(resultCode == RESULT_OK && CaptureImage.mCurrentPhotoPath != null){
                captureCallback.invoke(false,CaptureImage.mCurrentPhotoPath);
                CaptureImage.mCurrentPhotoPath = null;
            }
            else{
                captureCallback.invoke(true,"Canceled");
            }
        }
        else if(requestCode == 2){
            //SELECT IMAGE
            Uri imgUri;
            if (data != null) {
                imgUri = data.getData();
                if(imgUri != null){
                    selectCallback.invoke(false,getRealPathFromURI(getApplicationContext(), imgUri));
                    return;
                }
            }
            selectCallback.invoke(true,"Canceled");
        }
    }

    public static String getRealPathFromURI(Context context, Uri uri) {
        try{
            return  PathUtil.getPath(context,uri);
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == 0){
            for (int res : grantResults){
                if(res == PackageManager.PERMISSION_DENIED) return;
            }
            CaptureImage.captureFromNative(this,getApplicationContext());
        }
    }
}
