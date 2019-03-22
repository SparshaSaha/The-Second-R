import React,{Component} from 'react';
import {View,Text,StyleSheet,DatePickerAndroid, ListView, Image, AsyncStorage} from 'react-native';
import CheckBox from '../components/CheckBox'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';
import { post } from '../utils/request';
import ImageUploader from '../utils/Uploader';
import Styles from '../res/styles';
import Colors from '../res/colors';
import TextInput from '../components/TextInput';
import CircleIcon from '../components/CircleIcon';
import Button from '../components/Button';
import ImagePicker from '../components/ImagePicker';
import UploadModal from '../components/UploadModal';
import Toast from '../utils/Toast';

const isAvailable = (val) => {
    return (val ? "Available" : "Not Available");
}

export default class Sell extends Component{

    constructor(props){
        super(props);
        this.imgDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
        this.images = [];
        this.remoteImages = [];
        this.state = {
            showImagePicker : false,
            toUploadNum : 0,
            showUploadingModal : false,
            category : null,
            boughtDate : "Bought Date",
            cost : 0,
            title : '',
            charger : false,
            earphone : false,
            manual : false,
            warranty : false,
            desc : '',
            imageDataSource : (this.imgDataSource.cloneWithRows([]))
        }
    }

    async handleDatePicker() {
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({data :  Date.now()});
            if(action !== DatePickerAndroid.dismissedAction){
                this.setState({boughtDate : Moment(new Date(year,month,day)).format('MMM YYYY')});
            }
        }
        catch(e){
            //DATE PICKER COULDN'T OPEN
            console.log(e);
        }
    } 

    handleCategorySelection = (category) => {
        this.setState({category});
    }

    categoryBgColor = (category) => {
        return ((category == this.state.category) ? Colors.disabledGrey : 'white');
    }

    getUserId = async () => {
        try{
            const val = await AsyncStorage.getItem('userData');
            if(val !== null){
                console.log(val);
                return (JSON.parse(val)._id);
            }
            return null;
        }
        catch(ex){
            console.log(ex);
        }
    }

    accumulatePhoneDesc = () => {
        var desc = this.state.desc;
        desc += "\nWarranty : " + isAvailable(this.state.warranty)
        + "\nEarphone : " + isAvailable(this.state.earphone)
        + "\nCharger : " + isAvailable(this.state.charger)
        + "\nManual : " + isAvailable(this.state.manual);
        return desc;
    }

    imgItem = (data) => {
        return(
            <View style={{padding : 5}}>
                <Image source = {{uri : "file://" + data}} style={{width : 50,height : 50}}/>
            </View>
        );
    }

    handleImagePicker = (err,result) => { 
        this.setState({showImagePicker : false});
        if(err) return;
        this.images.push(result);
        this.setState({imageDataSource : this.imgDataSource.cloneWithRows(this.images)});
    }

    handleAfterUpload = () => {
        let title = this.state.title;
        let boughtDate = this.state.boughtDate;
        let description = this.accumulatePhoneDesc();
        let imageLink = this.remoteImages;
        let cost = this.state.cost;
        this.getUserId().then((id) => {
            post('/postAd',{ title,imageLink,description,cost,userId : id})
            .then((res) => {
                if(res.err) alert("Failed");
                else{
                    Toast.show("Ad Posted",Toast.LONG);
                    this.props.goto("Home");
                }
            });
        });
    }

    upload = (index) => {
        if(index == -1) {
            this.setState({showUploadingModal : false});
            this.handleAfterUpload();
            return;
        }
        ImageUploader.upload(this.images[index],(err,result) => {
            if(!err){
                this.remoteImages.push(result);
                this.setState({ toUploadNum : this.state.toUploadNum + 1 },() => {
                    this.upload(index-1);
                });
            }
            else{
                alert("Failed");
                this.setState({showUploadingModal : false});
            }
        });
    }

    postAd = () => {
        //TODO VALIDATE ALL THE FIELDS
        if(this.images.length < 1){
            alert("Add atleast 1 image");
            return;
        }
        this.setState({showUploadingModal : true, toUploadNum : 0},() => {
            this.upload(this.images.length - 1);
        });
        
    }
    
    render(){
        return (
            <View style={[Styles.container,styles.root]}>
            <UploadModal visible={this.state.showUploadingModal}>{this.state.toUploadNum +"/"+this.images.length+ " Images Uploaded"}</UploadModal>
            <ImagePicker visible={this.state.showImagePicker} onResult = {this.handleImagePicker}/>

                <View style={styles.frameRoot}>
                    <KeyboardAwareScrollView>
                        <View>
                            <View>
                                <TextInput style={styles.formTextStyle} placeholder="Product Model" 
                                        leftImage = {require('../res/images/name.png')}
                                        onChangeText = {(title) => this.setState({title})}/>
                                <TextInput style={styles.formTextStyle} placeholder="Product Model" 
                                        leftImage = {require('../res/images/calendar.png')}
                                        onPress = {() => this.handleDatePicker()}
                                        text = {this.state.boughtDate}
                                        disabled/>
                                
                                <TextInput style={styles.formTextStyle} placeholder="Selling Price"
                                    leftImage={require('../res/images/rupee.png')}
                                    onChangeText = {(cost) => this.setState({cost : parseInt(cost)})}
                                    keyboardType = "numeric"
                                    multiline />
                                
                                <View style={styles.phoneDescStyle}>
                                    <CheckBox title="Charger"
                                        onPress = {(charger) => this.setState({charger})}/>
                                    <CheckBox title="Earphone"
                                        onPress = {(earphone) => this.setState({earphone})}/>
                                </View>
                                <View style={styles.phoneDescStyle}>
                                    <CheckBox title="Manual"
                                        onPress = {(manual) => this.setState({manual})}/>
                                    <CheckBox title="Warranty"
                                        onPress = {(warranty) => this.setState({warranty})}/>
                                </View>
                                <TextInput style={styles.formTextStyle} placeholder="Description"
                                    leftImage={require('../res/images/signal.png')}
                                    onChangeText = {(desc) => this.setState({desc})}
                                    multiline />
                            </View>
                            <Button text="Add Images" style={{borderRadius : 10}} onPress={() => this.setState({showImagePicker : true})}/>
                            <ListView
                                style={{margin: 10}}
                                dataSource = {this.state.imageDataSource}
                                renderRow = {(data) => this.imgItem(data)}
                                horizontal
                                enableEmptySections />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={{width : '100%'}}>
                    <Button text = "Post Ad" style={{alignSelf : 'center'}} onPress={this.postAd}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        alignItems : 'center',
        backgroundColor : 'white'
    },
    categoryContainer : {
        flexDirection :'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    categoryRoot :{
        backgroundColor:'white',
        elevation:5,
        alignItems:'center',
        marginTop:5,
        padding : 10,
    },
    frameRoot : {
        flex : 1,
        marginTop : 10,
        backgroundColor : 'white',
        width : '100%',
        alignItems : 'center'
    },
    formTextStyle : {
        width : '100%',
        marginVertical : 7
    },
    phoneDescStyle : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    }
});