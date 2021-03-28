import React from 'react';
import {
    ProgressViewIOSComponent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';


export default function Setting({navigation}){

    return(
    <SafeAreaView style = {styles.container}>
        <View style = {styles.statusbar}>
            <TouchableOpacity style = {styles.backbutton} onPress={()=>navigation.goBack()} >
              <Image style = {styles.settingimage} source={require('./icon/back.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingbutton}>
            <Text style = {styles.title}>
              설정
            </Text>
            </TouchableOpacity>
            <View style = {styles.view2}>
            </View>
        </View>
        <View style =  {styles.view}>
        
        </View>
    </SafeAreaView>)
}
const styles = StyleSheet.create({
    backbutton:{
      flex:2,
      color: 'white',
      margin:5
    },
    view2:{
      flex:2,
    },
    view:{
        flex:10
    },
    container: {
        height:'100%',
        width:'100%',
      },
    statusbar:{
        flex:1,
        backgroundColor: '#2B697F',
        justifyContent:'center',
        flexDirection:'row',
        alignItems: 'center',
      },settingbutton:{
        flex:8,
        margin:5,
        backgroundColor: '#2B697F',
        justifyContent: 'center',
        alignItems: 'center',
      },title:{
        flex:8,
        margin:15,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize:26
      },settingimage:{
        resizeMode:'contain',
        height:"50%",
        width:"50%",
      }, imageStyle:{
        marginLeft:15,
        marginRight:20,
        alignSelf:'center',
        width:20,
        height:24,
        justifyContent:'center'
      }
})