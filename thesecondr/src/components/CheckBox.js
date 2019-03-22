import React,{Component} from 'react';
import {CheckBox as Checkbox} from 'react-native-elements';

export default class CheckBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            checked : false
        }
    }
    onPress = () => {
        this.setState({checked : !this.state.checked});
        if(this.props.onPress) this.props.onPress(!this.state.checked);
    }
    render(){
        return(
            <Checkbox checked = {this.state.checked} onPress={this.onPress} title={this.props.title}/>
        );
    }
}