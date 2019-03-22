import React,{Component} from 'react'
import {TouchableOpacity,View,Text} from 'react-native'
import Styles from '../res/styles';

export default class Button extends Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.88} disabled={this.props.disabled}>
                <View style={[Styles.center,Styles.wideButton,this.props.style]}>
                        <Text style={[{color : 'white', fontFamily : 'Ubuntu-Light'}, this.props.textStyle]}>
                            {this.props.text}
                        </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
