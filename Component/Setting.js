import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity, 
  View,
  ScrollView,
} from 'react-native';
import MMKVStorage from "react-native-mmkv-storage";
import Modal from 'react-native-modal';
import SettingsList from 'react-native-settings-list';
import colors from '../Constant/colors';
import Banner from './Banner/Banner';

export default function Setting({navigation}){


  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [cInfoModalVisible, setCInfoModalVisible] = useState(false);
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

  const cInfoRenderModal = () => {
    return(
      <ScrollView style = {{backgroundColor:color[1], margin:5}}>
        
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            삼각함수
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            단위 : °
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            자연상수
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            e : 2.71828182846
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            팩토리얼(!)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            수식 : n! = n×(n-1)...×2×1
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            순열(P)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            수식 : nPr = n!/(n-r)!
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            조합(C)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            수식 : nCr = n!/((n-r)!×r!)
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            중복순열(π)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            수식 : nπr = n^r
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            중복조합(H)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            수식 : nHr = (n+r-1)Cr
          </Text>
          <Text style={{margin:5,fontSize:20, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            스털링 수(S)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            점화식 : S(n,r) = S(n-1,r-1) + rS(n-1,r)
          </Text>
          
          
      </ScrollView>
    )
  }
  
  const infoRenderModal = () => {
    return(
      <View style = {{backgroundColor:color[1], margin:5}}>
        
          <Text style={{margin:5,fontSize:30, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            Info
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            App Version: 2.0.0(alpha)
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            App Name: 확통 계산기 2.0
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            Dev Platform: React Native
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            BugReport: junhyuk.park52@gmail.com
          </Text>
          <Text style={{margin:5,fontSize:15, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            Dev Email: junhyuk.park52@gmail.com
          </Text>
      </View>
    )
  }

  const renderModal = () => {
    let colorL = Object.keys(colors).map((key) => [key, colors[key]]);
    let colorList = colorL.map((color, index)=>{
        return(
        <View key = {index} style = {{backgroundColor:color[1], margin:5}}>
          <TouchableOpacity style={{margin:10}} onPress={()=>saveColorData(color[0])}>
            <Text style={{color:"#FFFFFF",fontSize:23, fontFamily:'NeoDunggeunmoCode-Regular'}}>
              {color[0]}
            </Text>
          </TouchableOpacity>
        </View>)
      
    })
    return <View>{colorList}</View>
    
  }

  const toggleInfoModal = () => {
    console.log("info toggled");
    setInfoModalVisible(!infoModalVisible);
  }

  const toggleCInfoModal = () => {
    console.log("Cinfo toggled");
    setCInfoModalVisible(!cInfoModalVisible);
  }

  const toggleThemeModal = () => {
    console.log("theme toggled");
    setThemeModalVisible(!themeModalVisible);
  }

  const styles = StyleSheet.create({
      backbutton:{
        flex:2,
        color: 'white',
        margin:5
      },
      emptyView:{
        flex:2,
      },
      buttonView:{
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        
      },
      middleView:{
          flex:4,
          height:"100%",
          justifyContent:'center',
          alignItems: 'center',
      },
      view:{
          flex:10,
          flexDirection:'column',
          backgroundColor:color
      },
      container: {
          height:'100%',
          width:'100%',
        },
      statusbar:{
          flex:1,
          backgroundColor: color,
          flexDirection:'row',
          justifyContent:'center',
          alignItems: 'center',
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          borderWidth: 2,
      },settingbutton:{
          flex:8,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center', 
        },title:{
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily:'NeoDunggeunmoCode-Regular',
          fontSize:23
        },settingimage:{
          resizeMode:'contain',
          height:"70%",
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
            })}>
              <Image 
                style = {styles.settingimage} 
                source={require('../icon/back.png')} />
            </TouchableOpacity>
          
          <View style = {styles.middleView}>
            <Text style = {styles.title}>
              설정
            </Text>
          </View>
            <View style = {styles.emptyView}>
             
            </View>
          </View>
        <View style =  {styles.view}>
          <TouchableOpacity style={styles.settinglistitem} onPress={toggleThemeModal}>
            <Text style={styles.settingText}>
              Theme
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settinglistitem} onPress={toggleCInfoModal}>
            <Text style={styles.settingText}>
              Calculation Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settinglistitem} onPress={toggleInfoModal}>
            <Text style={styles.settingText}>
              App Info
            </Text>
          </TouchableOpacity>
        </View>
        
        <View>
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
        <View >
          <Modal isVisible={infoModalVisible} backdropColor={'#000000'} >
              <View style={{display:"flex" ,marginHorizontal:"10%", marginVertical:"10%", backgroundColor:"#FFFFFF"}}>
                  {infoRenderModal()}
                  <View style={{margin:10 }}>
                    <TouchableOpacity onPress={toggleInfoModal}>
                      <Text style = {{fontSize:30, fontFamily:'NeoDunggeunmoCode-Regular'}}>
                      Close
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </Modal>
        </View>
        <View >
          <Modal isVisible={cInfoModalVisible} backdropColor={'#000000'} >
              <View style={{display:"flex" ,marginHorizontal:"10%", marginVertical:"10%", backgroundColor:"#FFFFFF"}}>
                  {cInfoRenderModal()}
                  <View style={{margin:10 }}>
                    <TouchableOpacity onPress={toggleCInfoModal}>
                      <Text style = {{fontSize:30, fontFamily:'NeoDunggeunmoCode-Regular'}}>
                      Close
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </Modal>
        </View>
         <Banner>

         </Banner>
    </SafeAreaView>)
}
