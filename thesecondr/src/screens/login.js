import React,{Component} from 'react';
import {View,Dimensions,Image,Text,AppRegistry, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {post} from '../utils/request';
import Toast from '../utils/Toast'
import Styles from '../res/styles';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Logo from '../components/Logo';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            width : 0,
            currentPage : 2,
            email : '',
            password : ''
        }
    }
    
    componentDidMount(){
        this.setState({width : Dimensions.get('window').width});
    }

    onRegisterPress = () => {
        Actions.register();
    }

    onLoginPressed = () => {
        var email = this.state.email;
        var password =  this.state.password;
        post('/signin',{
            email,
            password
        })
        .then(async (res) => {
            if(res.error){
                Toast.show(res.res,Toast.SHORT);
            }
            else{
                //GO TO HOME CODE GOES HERE
                console.log(res.res);
                try{
                    await AsyncStorage.setItem('userData',JSON.stringify(res.res));
                    Actions.home();
                }
                catch(ex){
                    console.log(ex);
                }
            }
        });
    }

    render(){
        return(
            <View style={[Styles.container,{alignItems:'stretch'}]}>
                <View style={[Styles.container,Styles.center]}>

                    <Logo />

                    <TextInput
                        style = {{marginTop : 20}} 
                        leftImage = {require('../res/images/mail.png')}
                        placeholder="Email"
                        onChangeText={ (email)=> this.setState( { email } ) }/>
                
                    <TextInput
                        style = {{marginTop : 10}}
                        leftImage = {require('../res/images/locked.png')}
                        placeholder="Password"
                        onChangeText={ (password)=> this.setState( { password } ) }
                        password/>

                    <Button text="Login"
                        onPress={this.onLoginPressed}
                        style={{width : 310, borderRadius : 10, marginTop : 15}}/>
                </View>

                <View style={{flexDirection : 'row',justifyContent:'center'}}>
                    <Button text="Forgot Password?" style={{width : this.state.width/2}}/>
                    <Button text="Register" style={{width : this.state.width/2}} onPress={this.onRegisterPress}/>
                </View>
            </View>
        );
    }
}
