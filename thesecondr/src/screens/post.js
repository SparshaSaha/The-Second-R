import React from 'react';
import {View,Text,ViewPagerAndroid,Image,ScrollView,StyleSheet,AsyncStorage} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { get } from '../utils/request';
import Caller from '../utils/Caller';
import Styles from '../res/styles';
import Button from '../components/Button';

export default class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sellerPhone : '',
            sellerEmail : '',
            sellerName : ''
        }
        this.imageLinks = this.props.data.imageLink;
    }

    componentWillMount(){
        this.renderPage();
        this.getSellerInfo();
    }

    renderPage = () => {
        this.views = []
        this.imageLinks.forEach(element => {
            this.views.push(
                <View>
                    <FastImage source = {{uri : element}} style={{width : '100%',height : 250}} />
                </View>
            )
        });
    }

    getSellerInfo = () => {
        console.log(this.props.data);
        get('/getUserById',{id : this.props.data.userId})
        .then((response) => {
            console.log(response);
            if(response.error) alert("Seller Not Found");
            else {
                var sellerData = response.res;
                this.setState({
                    sellerPhone : sellerData.phone,
                    sellerEmail : sellerData.email,
                    sellerName : sellerData.name
                });
            }
        })
    }

    openDialer = () => {
        Caller.call(this.state.sellerPhone);
    }

    handleButtonPress = () => {
        if(this.props.isMyOrder){
            //DELETE ORDER
            get('/deleteOrder',{id : this.props.data._id})
            .then((response) => {
                if(response.error) alert("Couldn't delete Ad");
                else{
                    Actions.pop();
                }
            });

        }
        else{
            this.openDialer();
        }
    }

    render(){
        return(
            <View style={Styles.container}>
                <View style = {{flex : 1}}>
                    <ViewPagerAndroid
                        style= {{height : 250}}
                        initialPage={0}>
                        {this.views}
                    </ViewPagerAndroid>
                    <ScrollView>
                        <View style={{paddingHorizontal : 20, paddingVertical : 10}}>
                            <Text style={styles.titleText}>{this.props.data.title}</Text>
                            <Text style={[styles.titleText,{fontSize : 25}]}>{"Rs. "+this.props.data.cost}</Text>
                            <Text style={[styles.titleText,{alignSelf : 'flex-start',fontSize : 20, marginTop : 20}]}>Description</Text>
                            <Text style={{fontSize : 15}}>{this.props.data.description}</Text>
                            <Text style={[styles.titleText,{alignSelf : 'flex-start',fontSize : 20, marginTop : 20}]}>Seller Info.</Text>
                            <Text style={{fontSize : 15}}>{"Name : " + this.state.sellerName}</Text>
                            <Text style={{fontSize : 15}}>{"Email : " + this.state.sellerEmail}</Text>
                            <Text style={{fontSize : 15}}>{"Phone : " + this.state.sellerPhone}</Text>
                        </View>
                    </ScrollView>
                </View>
                <Button text={(this.props.isMyOrder)?"Delete Order":"Call Seller"} onPress={this.handleButtonPress}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText : {
        alignSelf : 'center',
        color : 'black',
        fontWeight : 'bold',
        fontSize : 30,
        fontFamily : 'Ubuntu-Light'
    }    
})