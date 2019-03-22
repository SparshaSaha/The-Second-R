import {NativeModules} from 'react-native';
module.exports = NativeModules.ImageSelector;

/**
 * Selects Image from file
 * Functions : 
 * 1. select(Callback callback)
 *  callback = (err,result)
 *      err : boolean in case of error
 *      result: contains starce if error else image path
 */