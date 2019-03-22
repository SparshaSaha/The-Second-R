import React,{Component} from 'react';
import {Image,View,Text} from 'react-native';
import Styles from '../res/styles';

export default class Logo extends Component{
    render(){
        return (
            <View style={[Styles.center,this.props.style]}>
                    <Image source={require("../res/images/logo.png")}
                            style={Styles.logo}/>

                        <Text style={Styles.title} >SecondR</Text>
            </View>
        );
    }
}