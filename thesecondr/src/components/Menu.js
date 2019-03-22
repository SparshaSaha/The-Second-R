import React,{Component} from 'react';
import {View,Image} from 'react-native';
import Logo from './Logo';
import Styles from '../res/styles';
import Colors from '../res/colors';

export default class Menu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[{flex :1, alignItems:'center', padding : 30,backgroundColor:Colors.disabledGrey,paddingTop:80}]}>
                <Logo />

                <View style = {{marginTop : 80}}/>
                <View style={{alignSelf : 'flex-start'}}>
                    {this.props.children}
                </View>
            </View>
        );
    }
} 