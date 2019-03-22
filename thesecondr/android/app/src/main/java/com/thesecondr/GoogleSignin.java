package com.thesecondr;

import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;

/**
 * Created by sid on 29/8/18.
 */

public class GoogleSignin extends ReactContextBaseJavaModule {

    GoogleSignInClient mGoogleSignInClient;

    public GoogleSignin(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GoogleSignin";
    }

    private void init(){
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(getReactApplicationContext(), gso);
    }

    @ReactMethod
    public void signin(Callback callback){
        init();
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(getReactApplicationContext());
        if(account != null)
            callback.invoke(account.getDisplayName(),account.getEmail());
        else {
            MainActivity.signInCallback = callback;
            signIn();
        }
    }

    private void signIn() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        getCurrentActivity().startActivityForResult(signInIntent, 0);
    }
}
