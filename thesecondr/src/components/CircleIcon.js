import React,{Component} from 'react';
import {Image,View,TouchableOpacity,Text} from 'react-native';
import Colors from '../res/colors';

export default class CircleIcon extends Component{
    render(){
        return(
            <TouchableOpacity style={{margin : 3}} onPress={this.props.onPress}>
            <View style={{alignItems:'center'}} >
                <View style={{backgroundColor : (((this.props.select)?Colors.disabledGrey:'white')), 
                    borderColor : 'black', borderWidth:3, borderRadius:100,padding:15}}>
                    <Image source={this.props.source} style={{width : 60, height : 60}}/>
                </View>
                <Text style={{margin : 5, color:(this.props.select)?'black':'grey'}}>{this.props.children}</Text>
            </View>
            </TouchableOpacity>
        );
    }
}