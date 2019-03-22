import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import Modal from "react-native-modal";
import Button from './Button';
import Camera from '../utils/Camera';
import ImageSelector from '../utils/ImageSelector';

export default class ImagePicker extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Modal isVisible={this.props.visible} animationIn = "slideInUp" 
                    onBackdropPress={() => this.props.onResult(true,"Canceled")}>
                    <View style={{backgroundColor : 'white', alignItems:'center',padding : 10, borderRadius:10}}>
                        <Button text="Pick Image from Files" style={styles.button}
                            onPress={() => {
                                ImageSelector.select((err,result) => {
                                    this.props.onResult(err,result);
                                });
                            }}/>
                        <Button text="Capture from Camera" style={styles.button}
                            onPress={() => {
                                Camera.capture((err,result) => {
                                    this.props.onResult(err,result)
                                }); 
                            }}/>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        width : 300,
        margin : 10,
        borderRadius : 10
    }
});