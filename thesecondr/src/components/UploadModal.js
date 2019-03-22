import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import Modal from "react-native-modal";

export default class UploadModal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Modal isVisible={this.props.visible} >
                    <View style={{paddingRight : 70, padding :20, backgroundColor : 'white', borderRadius : 5, alignItems : 'center', flexDirection:'row', justifyContent:'center'}}>
                        <ActivityIndicator color='black' size={50}/>
                        <View style={{marginLeft : 20}}>
                            <Text style={{fontSize : 23}}>Uploading...</Text>
                            <Text style={{fontSize : 15}}>{this.props.children}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
