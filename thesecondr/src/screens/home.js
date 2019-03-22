import React,{Component} from 'react';
import {StyleSheet,Image,View,Text,TouchableOpacity,AsyncStorage} from 'react-native';
import Drawer from 'react-native-drawer';
import {Actions} from 'react-native-router-flux';
import Styles from '../res/styles';
import Menu from '../components/Menu';
import MenuText from '../components/MenuText';
import Browse from './browse';
import Orders from './orders';
import Sell from './sell';
import Profile from './profile';


export default class Home extends Component{

    constructor(props){
        super(props);
        this.browse = (<Browse goto={this.gotoByHeader}/>);
        this.sell = (<Sell goto={this.gotoByHeader}/>);
        this.orders = (<Orders goto={this.gotoByHeader}/>);
        this.profile = (<Profile goto={this.gotoByHeader}/>);
        this.state = {
            currentPage : this.browse,
            header : 'Home',
            isDrawerOpen : true
        }
    }

    logout = async () => {
        //LOGOUT CODE GOES HERE
        try{
            await AsyncStorage.removeItem('userData',(err) => {
                console.log(err);
            });
            Actions.splash({type : 'replace' });
        }
        catch(ex){
            console.log(ex);
        }
    }

    gotoByHeader = (header) => {
        switch(header){
            case 'Home':
                this.goto(this.browse,header);
                break;
            case 'Sell':
                this.goto(this.sell,header);
                break;
            case 'My Orders':
                this.goto(this.orders,header);
                break;
            case 'My Profile':
                this.goto(this.profile,header);
                break;
        }
    }

    goto = (screen,header) =>{
        this.setState({currentPage : screen, header});
        this.drawer.close();
    }

    toggleDrawer = () => {
        if(this.state.isDrawerOpen) this.drawer.close();
        else this.drawer.open();
    }

    render(){
        return(
            <View style={Styles.container}>
            <View style={drawerStyles.headerView}>
                <TouchableOpacity onPress = {this.toggleDrawer}>
                    <Image source={require('../res/images/stack.png')} 
                        style={{width : 25, height :25}}/>
                </TouchableOpacity>
                <Text style={drawerStyles.headerText}>{this.state.header}</Text>
            </View>
                <Drawer
                    tapToClose
                    panOpenMask = {0.07}
                    panCloseMask = {0.07}
                    negotiatePan={true}
                    captureGestures={true}
                    type="displace"
                    side = 'left'
                    onClose = {() => this.setState({isDrawerOpen : false})}
                    onOpen = {() => this.setState({isDrawerOpen : true})}
                    styles={drawerStyles}
                    ref = {(ref) => this.drawer = ref}
                    content={(
                        <Menu>
                            <MenuText source={require('../res/images/search.png')} onPress={() => this.goto(this.browse,"Home")}>Home</MenuText>
                            <MenuText source={require('../res/images/trade.png')} onPress={() => this.goto(this.sell,"Sell")}>Sell</MenuText>
                            <MenuText source={require('../res/images/orders.png')} onPress={() => this.goto(this.orders,"My Orders")}>My Orders</MenuText>
                            <MenuText source={require('../res/images/personal.png')} onPress={() => this.goto(this.profile,"My Profile")}>My Profile</MenuText>
                            <MenuText source={require('../res/images/logout.png')} onPress={this.logout}>Logout</MenuText>
                        </Menu>
                    )}
                    openDrawerOffset={0.4}
                    tweenHandler={(ratio) => ({
                        main: { opacity: Math.max(0.1,(1-ratio)) }
                    })}>
                    {this.state.currentPage}
                </Drawer>
            </View>
        );
    }
}

const drawerStyles = StyleSheet.create({
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    headerView : {
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        width:'100%',
        height:60,
        elevation:5,
        backgroundColor:'white',
        padding :10
    },
    headerText : {
        fontSize : 23,
        marginLeft : 10,
        color:'black',
        fontFamily : 'Ubuntu-Medium'
    }
  });
