import React,{useEffect,useState} from 'react';
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
import MMKVStorage from "react-native-mmkv-storage";
import Modal from 'react-native-modal';
import SettingsList from 'react-native-settings-list';
import colors from '../Constant/colors';


export default function Setting({navigation}){
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const MMKV = new MMKVStorage.Loader().initialize();
    


  useEffect(()=>{
    
    MMKV.indexer.strings.hasKey("theme").then(async (result) => {
      console.log("Setting.js/"+"result : "+result)
      if (!result) {
        //default color setting
        await MMKV.setStringAsync("theme", "Navy").then(async ()=>{
          console.log("Setting.js/"+"theme : " + await MMKV.getStringAsync("theme"));
        })
        .catch(err=>console.log(err));
      }else{
        await MMKV.getStringAsync("theme").then(res=>{
          console.log("Setting.js/"+"color : "+colors[res])
          setColor(colors[res]);
        })
      }
    });
    
    
  },[])

  const saveColorData = async (color) => {
    await MMKV.setStringAsync("theme", color).then(async ()=>{
      console.log("History.js/"+"theme : " + await MMKV.getStringAsync("theme"));
      await MMKV.getStringAsync("theme").then(res=>{
        console.log("History.js/"+"color : "+colors[res])
        setColor(colors[res]);
      })
    })
    .catch(err=>console.log(err));
  }
  
  const renderModal = () => {
    let colorL = Object.keys(colors).map((key) => [key, colors[key]]);
    let colorList = colorL.map((color, index)=>{
        return(
        <View key = {index} style = {{backgroundColor:color[1], margin:5}}>
          <TouchableOpacity style={{margin:5}} onPress={()=>saveColorData(color[0])}>
            <Text style={{fontSize:30, fontFamily:'NeoDunggeunmoCode-Regular'}}>
              {color[0]}
            </Text>
          </TouchableOpacity>
        </View>)
      
    })
    return <View>{colorList}</View>
    
  }

  const toggleThemeModal = () => {
    console.log("toggled");
    setThemeModalVisible(!themeModalVisible);
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
          flex:10,
          flexDirection:'row',
          backgroundColor:color
      },
      container: {
          height:'100%',
          width:'100%',
        },
      statusbar:{
          flex:1,
          backgroundColor: color,
          justifyContent:'center',
          flexDirection:'row',
          alignItems: 'center',
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          borderWidth: 2,
      },settingbutton:{
          flex:8,
          margin:5,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        },title:{
          flex:8,
          margin:15,
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily:'NeoDunggeunmoCode-Regular',
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
        },
        settinglistitem:{
          height:100,
          width:"95%",
          borderWidth:2,
          borderColor:"#FFFFFF",
          margin:10,
          justifyContent:'center',
          alignItems:'center',
        },
        settingText:{
          fontSize:26,
          color:"white",
          fontFamily:'NeoDunggeunmoCode-Regular',
        }
    })
    return(
    <SafeAreaView style = {styles.container}>
        <View style = {styles.statusbar}>
            <TouchableOpacity style = {styles.backbutton} onPress={()=>navigation.navigate({
            name: 'Main',
            params: { color: color },
            merge: true,
          })} >
              <Image style = {styles.settingimage} source={require('../icon/back.png')} />
            </TouchableOpacity>
            <View style={styles.settingbutton}>
              <Text style = {styles.title}>
                설정
              </Text>
            </View>
            <View style = {styles.view2}>
                
            </View>
        </View>
        <View style =  {styles.view}>
          <TouchableOpacity style={styles.settinglistitem} onPress={toggleThemeModal}>
            <Text style={styles.settingText}>
              Theme
            </Text>
          </TouchableOpacity>
            
        </View>
        <View >
          <Modal isVisible={themeModalVisible} backdropColor={'#000000'} >
              <View style={{display:"flex" ,marginHorizontal:"10%", marginVertical:"10%", backgroundColor:"#FFFFFF"}}>
                  <View style={{margin:10 }}>
                    <Text style = {{fontSize:30, fontFamily:'NeoDunggeunmoCode-Regular'}}>
                      Select Color
                    </Text>
                  </View>
                  {renderModal()}
                  <View style={{margin:10 }}>
                    <TouchableOpacity onPress={toggleThemeModal}>
                      <Text style = {{fontSize:30, fontFamily:'NeoDunggeunmoCode-Regular'}}>
                      Close
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </Modal>
        </View>
         
    </SafeAreaView>)
}
