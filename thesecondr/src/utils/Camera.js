import {NativeModules} from 'react-native';
module.exports = NativeModules.Camera;

/**
 * Opens Camera Activity to capture image from camera natively.
 * Functions : 
 * 1. capture(Callback callback)
 *      callback : (err,result)
 *          err : boolean for exceptions and errors
 *          result : gives strace if error or image path if successfully captured. 
 */