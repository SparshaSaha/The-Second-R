import {NativeModules} from 'react-native';
module.exports = NativeModules.ImageUploader;

/**
 * Uploads image to firebase
 * Functions: 
 *  1. upload(String path, Callback callback)
 *      path : path of local file
 *      callback :  Callback after upload is done OR failed.
 */