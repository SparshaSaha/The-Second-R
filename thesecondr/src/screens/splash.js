import React,{Component} from 'react';
import {View,Image,Animated, AsyncStorage, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { get } from '../utils/request';
import Button from '../components/Button';
import Styles from '../res/styles';
import Logo from '../components/Logo';
import GoogleSignIn from '../utils/GoogleSignIn'

export default class Splash extends Component{

    constructor(props){
        super(props)

        this.state = {
            logoFadeValue : new Animated.Value(0),
            loginAnimValue : new Animated.Value(0)
        }
    }

    /*FADE IN ANIMATOR
        @param varToUpdate VARIABLE TO BE ANIMATED
        @param duration DURATION FOR WHICH VALUE TO ANIMATED
        @param callback FUNCTION TO BE CALLED AFTER THE END OF ANIMATION
    */
    fadeIn = (varToUpdate, duration, callback = () => {}) => {
        Animated.timing(
            varToUpdate,
            {
              toValue: 1,
              duration: duration,
            }
          ).start(callback);
    }

    componentDidMount(){
        this.fadeIn(this.state.logoFadeValue,1000,()=>{
            this.checkUserAlreadyLogin()
            .then((available) => {
                if(available) Actions.home({type : 'replace'});
                else this.fadeIn(this.state.loginAnimValue,500);
            })
        });
    }

    onLoginPress = () => {
        Actions.login();
    }

    checkUserAlreadyLogin = async () => {
        try{
            const val = await AsyncStorage.getItem('userData');
            return (val !== null);
        }
        catch(ex){
            console.log(ex);
        }
        return false;
    }

    onGoogleSignInPress = () => {
        GoogleSignIn.signin((name,email) => {
            console.log(email+" "+name);
            get('/googleSignIn', { email })
            .then(async (response) => {
                if(response.error) Actions.register({email, userName : name});
                else{
                    try{
                        await AsyncStorage.setItem('userData',JSON.stringify(response.res));
                        Actions.home();
                    }
                    catch(ex){
                        console.log(ex);
                    }
                }
            });
        });
    }

    render(){
        return(
            <View style={{flex:1}}>

                <Animated.View style={[{opacity : this.state.logoFadeValue, flex:1},Styles.center]}>

                        <Logo />

                </Animated.View>

                <Animated.View style={{opacity : this.state.loginAnimValue}}>

                    <View 
                        style={{flexDirection: 'row',justifyContent:'space-evenly',alignItems:'center',marginBottom:50}}>
                        <TouchableOpacity onPress = {this.onGoogleSignInPress}>
                            <Image source = {require("../res/images/google.png")} style={Styles.socialIcons}/>
                        </TouchableOpacity>
                        <Image source = {require("../res/images/facebook.png")} style={Styles.socialIcons}/>
                    </View>
                
                    <Button text="Login/Register with email instead."
                    onPress={this.onLoginPress}/>

                </Animated.View>

            </View>
        );
    }
}
