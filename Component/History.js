import React from 'react';
import { useEffect,useState } from 'react';
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
  FlatList,
  Alert
} from 'react-native';
import HistoryItem from './Item/HistoryItem';
import Banner from './Banner/Banner';
import MMKVStorage from "react-native-mmkv-storage";

export default function History({navigation,devmode}){

  const MMKV = new MMKVStorage.Loader().initialize();

  const [history, setHistory] = useState({})
  const [color, setColor] = useState("#FFFFFF");
  
  let styles = StyleSheet.create({
    deletebutton:{
      flex:2, 
      color: 'white',
      justifyContent:'flex-end',
      alignItems:'center',
    },
    backbutton:{
      flex:2,
      color: 'white',
      margin:5,
    },
    view:{
        flexDirection:'column',
        flex:10,
        backgroundColor: color,
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
        margin:5,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily:'NeoDunggeunmoCode-Regular',
        color: 'white',
        fontSize:23
      },settingimage:{
        resizeMode:'contain',
        height:"70%",
        width:"50%",
      },imageStyle:{
        marginLeft:15,
        marginRight:20,
        alignSelf:'center',
        width:20,
        height:24,
        justifyContent:'center'
      }
})
  //데이터 업데이트시 리스트 리로딩을 위한 state
  const [updatetoggle, setUpdateToggle] = useState(false)
  //theme init  
  useEffect(()=>{
      const MMKV = new MMKVStorage.Loader().initialize();
      
      MMKV.indexer.strings.hasKey("theme").then(async (result) => {
        //console.log("History.js/"+"result : "+result)
        if (!result) {
          //default color setting
          await MMKV.setStringAsync("theme", "Navy").then(async ()=>{
            //console.log("History.js/"+"theme : " + await MMKV.getStringAsync("theme"));
  
          })
          .catch(err=>console.log(err));
        }else{
          await MMKV.getStringAsync("theme").then(res=>{
            //console.log("History.js/"+"color : "+colors[res])
            setColor(colors[res]);
          })
        }
      });
      
      
    },[])
  
    //초기 Data 로딩
    useEffect(()=>{
      try{
        getData().then(results=>{
          //console.log(results)
          setHistory(results.reverse())})
      
      }catch(error){
        console.log(error)
        Alert(error.toString())
      }
    },[])
    //업데이트 토글 작동시 데이터 리로딩
    useEffect(()=>{
      try{
        getData().then(results=>{
          
            setHistory(results.reverse())
          
        })
          
      }catch(error){
        console.log(error)
        Alert(error.toString())
      }
    },[updatetoggle])
    //데이터 로딩을 위한 async 함수 -> promise 리턴을 기억하자
    
    async function getData(){
      try{
        let strings = await MMKV.indexer.strings.getAll();
        if(strings.length>0){
          strings = strings.filter(item=>item[1]!==null)
          strings = strings.filter(item=>item[0]!=="theme")
        }
        return strings
      }catch(err){
        console.error(err)
        return null
      }
      
      
    }
    //데이터 삭제를 위한 async 함수 -> promise 리턴 기억! + update 토글 적용
    async function deleteData(data){
      try{
        await MMKV.removeItem(data)
        setUpdateToggle(!updatetoggle)
      }catch(error){
        console.log(error)
      }
    }
    //공식 문서에 있는 메소드 사용시 ios에서 네이티브 에러 발생
    //error 트래킹은 firebase 이용
    function deleteAll(){
      getData().then(result => result.map((ele)=>{
        deleteData(ele[0])
      }))
    }
    
    const renderList = () => {
      if(history.length !==0){
        return <FlatList
        keyExtractor = {(item)=>item[0]}
        data = {history} 
        renderItem = {({item})=><HistoryItem color = {color} date = {item[0]} string = {item[1]} deleteItem={deleteData}></HistoryItem>}>
        </FlatList>
      }
      else {
        return 
        <Text>
          기록 없음
        </Text>
      }
    }
    const showDeleteAlert = () => {
        Alert.alert(
          "기록을 모두 삭제하시겠습니까?",
          "다시 복구할 수 없습니다",
          [
          
          {
              text:"삭제",
              onPress: () => deleteAll(),
              
          },
          {
            text: "취소",
            onPress: () => {},
            style: "cancel",
        },
          
          ],
          { cancelable: true }       
        );
    }
      
    return(
    <SafeAreaView style = {styles.container}>
        <View style = {styles.statusbar}>
            <TouchableOpacity style = {styles.backbutton} onPress={()=>navigation.goBack()} >
              <Image style = {styles.settingimage} source={require('../icon/back.png')} />
            </TouchableOpacity>
            <View style={styles.settingbutton}>
            <Text style = {styles.title}>
              계산기록
            </Text>
            </View>
            <TouchableOpacity style = {styles.deletebutton} onPress={()=>showDeleteAlert()} >
              <Image style = {styles.settingimage} source={require('../icon/delete.png')} />
            </TouchableOpacity>
        </View>
        <View style =  {styles.view}>
          {renderList()}
        </View>
        <Banner devmode={devmode}>

        </Banner>
    </SafeAreaView>)
}

