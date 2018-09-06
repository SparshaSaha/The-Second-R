import React,{Component} from 'react';
import {View,Text,Image,FlatList,StyleSheet} from 'react-native';
import { get } from '../utils/request';
import Styles from '../res/styles';

export default class Browse extends Component{

    constructor(props){
        super(props);
        this.state = {
            orders : []
        }
    }

    componentDidMount(){
        this.getAllAds();
    }

    getAllAds = () => {
        get('/getAds',{})
        .then((response) => {
            this.setState({orders : response.res});
        });
    }

    renderItem = (item) => {
        return(
            <View style={styles.cardRoot}>
                <Image source={{uri : item.imageLink[0]}} style={{height : 250, width : '100%'}}/>
                <Text style={styles.cardTitleStyle}>{item.title}</Text>
                <Text style={[styles.cardTitleStyle,{fontSize:16}]}>{"Rs. "+item.cost}</Text>
            </View>
        );
    }

    render(){
        return(
            <View style={Styles.container}>
                <FlatList data={this.state.orders}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor = {item => item._id} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardRoot : {
        alignItems : 'center',
        margin : 3,
        padding : 10,
        backgroundColor : 'white',
        elevation : 4,
        borderRadius : 2
    },
    cardTitleStyle :{
        alignSelf : 'flex-start',
        fontSize : 20,
        fontWeight : 'bold',
        color : 'black',
        marginVertical : 2
    }
});