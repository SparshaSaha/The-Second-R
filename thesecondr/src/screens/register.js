import React,{Component} from 'react';
import {View,ScrollView,StyleSheet,Dimensions,Image,Text,ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { post, get } from '../utils/request';
import StepIndicator from '../components/StepIndicator';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import Styles from '../res/styles';
import Colors from '../res/colors';
import Toast from '../utils/Toast'
import { Actions } from 'react-native-router-flux';
import Logo from '../components/Logo';


const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
}

const isEmail = (str) => {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str))
}

const isPhone = (str) => {
    return (/[2-9]{2}\d{8}$/.test(str));
}

export default class Register extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentPage : ((this.props.email == null)?1:2),
            name : this.props.userName || '',
            email : this.props.email || '',
            password : '',
            rePassword : '',
            address : '',
            phone : '',
            isEmailChecking : false,
            emailStatusImage : ((this.props.email == null )?require('../res/images/cross_red.png'):null),
            tick_green : require('../res/images/tick_green.png'),
            cross_red : require('../res/images/cross_red.png'),
            isEmailWrong : (this.props.email == null)
        }
        this.width = 0;
    }

    componentWillMount(){
        var window= Dimensions.get('window');
        //this.setState({width : window.width});
        this.width = window.width;
    }

    componentDidMount(){
        if(this.props.email){
            console.log(this.width);
            setTimeout(()=> this.scrollForm.scrollTo({x: this.width, y: 0, animated: false}),30);
        }
    }

    correctPersonalInfo(){
        const isOk = (!isBlank(this.state.name) && isEmail(this.state.email));
        if(!isOk) Toast.show("Invalid Data !",Toast.SHORT);
        return isOk;
    }

    correctPasswordInfo(){
        const isOk = (this.state.password.length > 2 && this.state.password == this.state.rePassword)
        if(!isOk) Toast.show("Invalid Data !",Toast.SHORT);
        return isOk;
    }

    correctContactInfo(){
        const isOk = isPhone(this.state.phone);
        if(!isOk) Toast.show("Invalid Phone !", Toast.SHORT);
        return isOk;
    }

    signUp(){
        var email = this.state.email;
        var password = this.state.password;
        var name = this.state.name;
        var phone = this.state.phone;
        var address = this.state.address;
        
        post('/signup',{
            name,
            email,
            password,
            phone,
            address
        })
        .then((response) => {
            console.log(response);
            if(response.error) Toast.show(response.result,Toast.SHORT);
            else{
                Toast.show("Successfully Registered",Toast.LONG);
                Actions.pop();
            }
        });
    }

    onContinuePressed = () => {
        switch(this.state.currentPage){
            case 1:
                if(!this.correctPersonalInfo()) return;
                break;
            case 2:
                if(!this.correctPasswordInfo()) return;
                break;
            case 3:
                if(!this.correctContactInfo()) return;
                this.signUp();
                break;
        }
        if(this.state.currentPage < 3){
            this.scrollForm.scrollTo({x: this.state.currentPage*this.width, y: 0, animated: true})
            this.setState({currentPage : this.state.currentPage+1});
        }
    }

    emailCheckImage = () => {
        if(isBlank(this.state.email)) return null;
        if(!this.state.isEmailChecking){
            return (<Image style={styles.emailIndicatorStyle} source={this.state.emailStatusImage}/>);
        }
        else{
            return (<ActivityIndicator style = {styles.emailIndicatorStyle} size="small" color={Colors.green} />);
        }
        return null;
    }

    checkEmailAvailablity = (email) => {
        this.setState({isEmailChecking : true});
        get('/checkEmailAvailable',{email})
        .then((response) => {
            if(this.state.email == email){
                this.setState({isEmailChecking : false})
                if(!isEmail(email) || !response.res) 
                    this.setState({emailStatusImage : this.state.cross_red,
                                    isEmailWrong : true});
                else if(response.res)
                    this.setState({emailStatusImage : this.state.tick_green,
                                    isEmailWrong : false});
            } 
        });
    }

    render(){
        console.log("Render");
        return(
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}>
                <View style={[Styles.center]}>
                <Logo style={{marginTop:60}}/>
            
                    <StepIndicator current={this.state.currentPage} style={{marginTop:50}} />
                    <ScrollView
                        ref = {(ref)=> this.scrollForm = ref}
                        scrollEnabled={false}
                        pagingEnabled={true}
                        style={{marginBottom:20, marginTop:30}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>

                        <View style={[{width : this.width},styles.pageStyle]}>
                            <TextInput
                                leftImage = {require('../res/images/user.png')}
                                placeholder="Name"
                                text={this.state.name}
                                onChangeText={(name)=>this.setState({name})}/>
                            <View style={{flex:1, flexDirection : 'row'}}>
                                <TextInput
                                    ref = {(ref)=>{this.emailView = ref}}
                                    style={{marginTop : 10}}
                                    leftImage = {require('../res/images/mail.png')}
                                    placeholder="Email"
                                    text={this.state.email}
                                    onChangeText={(email)=> {this.setState({email}); this.checkEmailAvailablity(email)}}/>
                                {this.emailCheckImage()}
                            </View>
                        </View>

                        <View style={[{width : this.width},styles.pageStyle]}>
                            <TextInput                     
                                leftImage = {require('../res/images/locked.png')}
                                placeholder="Password"
                                onChangeText={(password)=>this.setState({password})}
                                password/>
                            <TextInput
                                style={{marginTop : 10}}
                                leftImage = {require('../res/images/locked.png')}
                                placeholder="Retype Password"
                                onChangeText={(rePassword)=>this.setState({rePassword})}
                                password/>
                        </View>

                        <View style={[{width : this.width},styles.pageStyle]}>
                            <TextInput
                                leftImage = {require('../res/images/phone.png')}
                                placeholder = 'Phone'
                                onChangeText = {(phone) => this.setState({phone})}
                                multiline/>
                            <TextInput
                                style = {{marginTop : 10}}
                                leftImage = {require('../res/images/route.png')}
                                placeholder = 'Address'
                                onChangeText = {(address) => this.setState({address})}
                                multiline/>
                        </View>

                    </ScrollView>
                    
                    <Button text={ ( this.state.currentPage != 3 ) ? "Continue" : "Sign up" }
                            style={{width : 310, borderRadius : 10, marginTop : 15}}
                            disabled = {this.state.isEmailWrong}
                            onPress={this.onContinuePressed}/>
                    
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pageStyle : {
        alignItems:'center'
    },
    emailIndicatorStyle : {position:'absolute',
        width : 20,
        height :20,
        left:'70%',
        top : '45%'}
});
