import React,{Component} from 'react'
import {View,Text,TextInput as RTextInput,Image,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import Styles from '../res/styles';

export default class TextInput extends Component{
    render(){
        return(
            <TouchableWithoutFeedback onPressOut={this.props.onPress}>
                <View style={[styles.container,this.props.style]}>
                    <Image style={[{width : 30,height :30},Styles.center]} source={this.props.leftImage}/>

                    <RTextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        placeholder={this.props.placeholder}
                        secureTextEntry={this.props.password}
                        multiline={this.props.multiline} 
                        editable={!this.props.disabled}
                        selectTextOnFocus={!this.props.disabled}
                        value={this.props.text}
                        keyboardType={(this.props.keyboardType)?this.props.keyboardType:'default'} />
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    inputText : {
        fontSize : 20,
        width : "70%",
        marginLeft : 10
    },

    container : {
        flexDirection:'row',
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 10,
        paddingHorizontal : 10,
        paddingVertical : 3,
        alignItems : 'center'
    }
})
