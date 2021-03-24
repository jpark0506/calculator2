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

export default function Setting({navigation}){

    return(
    <SafeAreaView style = {styles.container}>
        <View style = {styles.statusbar}>
            
            <TouchableOpacity style={styles.settingbutton} onPress={()=>navigation.goBack()}>
            <Text style = {styles.title}>
              Back
            </Text>
            </TouchableOpacity>
          </View>
        <View style =  {styles.view}>

        </View>
    </SafeAreaView>)
}
const styles = StyleSheet.create({
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
        flex:2,
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
      }
})