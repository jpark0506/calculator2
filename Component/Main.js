import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import * as mathstr from "math-expression-evaluator";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert
} from 'react-native';
import perf from '@react-native-firebase/perf';
import Banner from  './Banner/Banner'
import tokens from '../Constant/token';
import CalButton from './Button/CalButton'
import MMKVStorage from "react-native-mmkv-storage";
import moment from 'moment';
import 'moment/locale/ko';
import { handleTextLength} from '../Utils/Util'
import colors from '../Constant/colors';

const list = [
  ["AC","sin","cos","tan","e"],
  ["ln","(",",",")","S","H"],
  [7,8,9,"+","P"],
  [4,5,6,"-","C"],
  [1,2,3,"×","π"],
  [0,".","=","÷","!"],
]

export default function Main({navigation,route,devmode}){
  const [result, setResult] = useState(0)
  
  const MMKV = new MMKVStorage.Loader().initialize();
  //const [unit, setUnit] = useState({firstnum:"0", lastnum:"", operator:"",secondop:""})
  const [color, setColor] = useState("#23374D");

  

  useEffect(()=>{
    if(route.params?.color){
      setColor(route.params?.color);
    }
  },[route.params?.color])

  

  useEffect(()=>{
    const MMKV = new MMKVStorage.Loader().initialize();
    MMKV.indexer.strings.hasKey("theme").then(async (result) => {
      //console.log("Main.js/"+"result : "+result)
      if (!result) {
        await MMKV.setStringAsync("theme", "Navy").then(async ()=>{
          //초기 화면 설정에 대한 해결책
          await MMKV.getStringAsync("theme").then(res=>{
            //console.log("Main.js/"+"color : "+colors[res])
            setColor(colors[res]);
          });

        })
        .catch(err=>console.log(err));
      }
      else{
        await MMKV.getStringAsync("theme").then(res=>{
          //console.log("Main.js/"+"color : "+colors[res])
          setColor(colors[res]);
        });
      }
    });
   
  },[])
  let styles = StyleSheet.create({
    container: {
      height:'100%',
      width:'100%',
      
    },
    resultContainer: {
      flex: 2,
      padding:20,
      justifyContent: 'flex-end',
      alignContent:'center',
      backgroundColor: color,
    },
    buttonContainer: {
      flex: 7,
      backgroundColor: color,
      borderColor: "#FFFFFF",
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 5
    },
    resultText: {
      color: 'white',
      textAlign: 'right',
    },
    buttonRow: {
      flex: 1,
      flexDirection: 'row',
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
      flex:2,
      margin:5,
      justifyContent: 'center',
      alignItems: 'center',
    },title:{
      flex:8,
      margin:15,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily:'NeoDunggeunmoCode-Regular',
      color: 'white',
      fontSize:20,
    },settingimage:{
      resizeMode:'contain',
      height:"50%",
      width:"50%",
    }
  });
  // async function getData(){
  //   let strings = await MMKV.indexer.strings.getAll();
  //   return strings;
  // }
  const showCalAlert = (string) => {
        
    //console.log("showCalAlert",string)
    Alert.alert(
        "Calculation Error",
        string,[
       {
           text: "확인",
           onPress: () => {},
           style: "cancel",
       }],
       {cancelable:true}
    )
  }
  const showOffAlert = () => {
        
    //console.log("showCalAlert",string)
    Alert.alert(
        "앱을 종료하시겠습니까?",
        "",[
       {
           text: "취소",
           onPress: () => {},
           style: "cancel",
       },
       {
        text: "종료",
        onPress: () => {BackHandler.exitApp()},
        
        }],
       {cancelable:true}
    )
  }

  const saveData = async (resultstr,temp) => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss').toString();
    await MMKV.setStringAsync(date, temp.concat("=",resultstr)).then(
      ()=>{
        console.log(resultstr);
        setResult(resultstr);
      }
    ).catch(error => {
      console.log(error);
    });
  }
  //handlePress
  const handleOnPress = (data) => {
    handleresultString(data)
  }
  //연산 구현
  const handleresultString = async (data) => {
    
    if(data === '='){
      
        let resulttemp= result;
        
        let temp = result.replace(/×/gi,"*");
        temp = temp.replace(/÷/gi,"/");
        const trace = await perf().startTrace('calculation_trace');
        try{
          mathstr.addToken([tokens.tokenH,tokens.tokenpi, tokens.tokenS]);
          const resultstr = mathstr.eval(temp);
          saveData(resultstr,resulttemp);
          await trace.stop();
        }catch(e){
          showCalAlert(e.message);
          
        }
    }
    else if(data ==='AC'){
      setResult(0);
    }
    else if(data ==='C.'){
      setResult(0);
    }
    else{
      if(result === 0){
        setResult(data);
      }else{
        setResult(result+data.toString())
      }
      
    }
  }

function renderText(){
      number = result === undefined ? setResult(0) : result.toString().length
      if(!handleTextLength(number)){
        return(
          <Text selectable={true} style={{fontSize:70, fontFamily:'NeoDunggeunmoCode-Regular'}}>
            {result}
          </Text>
        )
      }else{
        return(
          <Text  selectable={true} style={{fontSize:25, fontFamily:'NeoDunggeunmoCode-Regular'}}>
              {result}
          </Text>
        )
      }
  }
  //버튼 렌더링
  function renderButtonLayout(){
   
    const renderButtonLayout = list.map((row, index)=>{
      const renderRow = row.map((button,index)=>{
        return(  
        <CalButton 
          color = {color}
          value = {button} 
          key = {"btn-"+index} 
          handleOnPress = {handleOnPress}>
        </CalButton>)
      })
      return(
        <View style = {styles.buttonRow} key = {"btnRow-"+index}>
          {renderRow}
        </View>
      )
    })
    return renderButtonLayout
  }


  return(
    //두번째 문장 대문자 붙이다가 오류 -> style 수정을 못함
    <SafeAreaView>
      <View style ={styles.container}>
          <View style = {styles.statusbar}>
            
            <Text style = {styles.title}>
              확통계산기 2.0
            </Text>
            
            <TouchableOpacity style={styles.settingbutton} onPress={()=>navigation.navigate('History')}>
             <Image style = {styles.settingimage} source={require('../icon/history.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingbutton} onPress={()=>navigation.navigate('Setting')}>
             <Image style = {styles.settingimage} source={require('../icon/setting.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingbutton} onPress={()=>showOffAlert()}>
             <Image style = {styles.settingimage} source={require('../icon/exit.png')} />
            </TouchableOpacity>
          </View>
          
          <View style = {styles.resultContainer}>
            <Text style = {styles.resultText} >
              {renderText()}
            </Text>
          </View>
          <View style = {styles.buttonContainer}>
            {renderButtonLayout()}
          </View>
          
          <Banner devmode = {devmode}></Banner>
      </View>
    </SafeAreaView>

  )
}

