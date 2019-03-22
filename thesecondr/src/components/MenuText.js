import React,{Component} from 'react';
import {TouchableOpacity,Text,View,Image} from 'react-native';

export default class MenuText extends Component {

    constructor(props){
        super(props);
    }

    render(){
        //console.log(this.props.children);
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{flexDirection : 'row', width : '100%', alignItems:'center',paddingVertical:20}}>
                    <Image source={this.props.source} style={{width : 20,height :20}}/>
                    <Text style = {{color:'black', fontSize : 20, fontFamily : 'Ubuntu-Medium',
                                    marginLeft : 10}}>
                        {this.props.children}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}