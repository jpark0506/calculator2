import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Asyncs
} from 'react-native';

import CalButton from './CalButton'
import MMKVStorage from "react-native-mmkv-storage";
import moment from 'moment';
import 'moment/locale/ko';
import {calculateResult, isOperator, unclickable, createUnclickableDialog, handleTextLength, checkHasString} from './Util'


const list = [
  ["C.","AC","(",")","S"],
  [7,8,9,"+","P"],
  [4,5,6,"-","C"],
  [1,2,3,"×","π"],
  [0,".","=","÷","H"],
]


export default function Main({navigation}){
  //double map + 컴포넌트에 key 활용
  const [result, setResult] = useState(0)
  const [opclicked, setOpclicked] = useState(false)
  const MMKV = new MMKVStorage.Loader().initialize();

  //unit 객체 설명
  //firstnum:첫번째 연산값
  //operator:연산자
  //lastnum:두번째 연산값
  //secondop: 두번째 연산자 미리 입력후 전달
  //iscalculating: 소수점 처리를 위해서 고안
  const [unit, setUnit] = useState({firstnum:"0", lastnum:"", operator:"",secondop:""})
  
  async function getData(){
    let strings = await MMKV.indexer.strings.getAll();
    return strings
  }
  //useState의 비동기적 처리 때문에 기존에 java나 C++에서 하던 것 처럼 바로 정확한 연산 결과를 받기 어려움
  //useEffect를 이용해서 unit 값이 변경 될 때마다 사용자가 결과를 원하는지 판단한 후 연산 진행
  //비동기 처리는 모두 useEffect로 처리 그냥 프로미스도 될라나?
  useEffect(() => {
    console.log(unit)
    if(unit.operator!=""&&unit.lastnum!="")
    {
      let re =  calculateResult(unit)
      if(unit.secondop!="="){
        let operator = unit.secondop
        const date = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        MMKV.setString(date, `${unit.firstnum} ${unit.operator} ${unit.lastnum} = ${re}`);
        setUnit(prevState => {return{...prevState,firstnum:re,operator:operator,lastnum:"",secondop:""}})
        setResult(re)
        getData().then(string => console.log(string))
      }else if(unit.secondop=="="){
        //소수점
        const date = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        MMKV.setString(date, `${unit.firstnum} ${unit.operator} ${unit.lastnum} = ${re}`);
        MMKV.setString(date, `${unit.firstnum} ${unit.operator} ${unit.lastnum} = ${re}`);
        setUnit(prevState => {return{...prevState,firstnum:re,operator:"",lastnum:"",secondop:""}})
        setResult(re)
        getData().then(string => console.log(string))
      }
    }
  }, [unit])
  //이런식으로 놔두면 렌더링 될 때마다 초기화
  //계산 결과 저장

  //이거 모듈화 하자
  //string 연산 알고리즘 구현
  handleresultString = (data) => {
    //.여러개 방지
    //왜 switchcase 문으로는 filtering이 안될까
    //소수점 처리
    //문자열 처리
    if(data == "C."){
      setResult(0)
    }else if(data=="AC"){
      setResult(0)
      setUnit(prevState => {return{...prevState, firstnum: "0", operator: "",lastnum:"",secondop:""}})
    }else if(isOperator(data)){
      //연산자일때
      const lastresult = checkHasString(result)
      setOpclicked(true)
      console.log("opclicked"+true)
        if(unit.operator==""){
          if(lastresult==result){
            setUnit(prevState => {return{...prevState,firstnum:result,operator: data, lastnum:"",secondop:""}})
          }else if(lastresult!=result){
            setUnit(prevState => {return{...prevState,firstnum:lastresult,operator: data, lastnum:"",secondop:""}})
            setResult(lastresult)
          }
        }
        else if(unit.operator!=""&&data!="="){
          if(lastresult==result){
            setUnit(prevState =>{return{...prevState, lastnum:result, secondop:data}},)
          }else if(lastresult!=result){
            setUnit(prevState =>{return{...prevState, lastnum:lastresult, secondop:data}},)
            setResult(lastresult)
          }
          
        }else if(unit.operator!=""&&data=="="){
          if(lastresult==result){
            setUnit(prevState =>{return{...prevState, lastnum:result, secondop:data}},)
          }else if(lastresult!=result){
            setUnit(prevState =>{return{...prevState, lastnum:lastresult, secondop:data}},)
          }
        }else if(unit.operator==""&&data=="=" &&unit.firstnum!=""){
          if(lastresult==result){
            setUnit(prevState =>{return{...prevState, operator:""}},)
          }else if(lastresult!=result){
            setUnit(prevState =>{return{...prevState, firstnum:lastresult, operator:""}},)
          }
        }else if(unit.operator==""&&unit.firstnum==""&&data=="="){
          setUnit(prevState => {return{...prevState, operator: "",lastnum:"",secondop:""}})
        }
      
    }else if(unclickable(data)){
      createUnclickableDialog()
    }else{
      if(result == "0"&&data !="."){
        setOpclicked(false)
        setResult(data.toString())
        console.log("opclicked : "+false)
      }else if(result != "0" && opclicked==true && data != "C" && data != "P" && data != "H" && data != "S" && data != "π"){
        setOpclicked(false)
        setResult(data)
        console.log("opclicked : "+false)
      }
      else if(opclicked==true && data =="C"||data=="P"||data=="H"||data =="S" ||data=="π")
      {
        setOpclicked(false)
        setResult(result.toString().concat(data))
        console.log("opclicked : "+false)
      }else if(opclicked==false && result != "0"){
        setResult(result.toString().concat(data))
      }
    }
  }

  handleOnPress = (data) => {
    handleresultString(data)
  }

function renderText(){
    //왜 변수가 0으로 넘어갈까

    //undefined 어디서 나오는거지?
      number = result === undefined ? setResult(0) : result.toString().length
      if(!handleTextLength(number)){
        return(
          <Text>
            {result}
          </Text>
        )
      }else{
        setResult(result.toString().slice(0,6))
        return(
          <Text>
              {result}
          </Text>
        )
      }
  }

  function renderButtonLayout(){
    //handleOnPress props 전달 why? 
    //함수도 일급 객체여서 props로 넘겨줄 수 있다.
    // props를 넘겨준 후에는 변화하면 안된다.
    //따라서 넘겨준 자식 컴포넌트에서는 함수 그대로 활용
    const renderButtonLayout = list.map((row, index)=>{
      const renderRow = row.map((button,index)=>{
        return(  
        <CalButton 
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
             <Image style = {styles.settingimage} source={require('./icon/history.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingbutton} onPress={()=>navigation.navigate('Setting')}>
             <Image style = {styles.settingimage} source={require('./icon/setting.png')} />
            </TouchableOpacity>
          </View>
          <View style = {styles.resultContainer}>
            <Text style = {styles.resultText}>
              {renderText()}
            </Text>
          </View>
          <View style = {styles.buttonContainer}>
            {renderButtonLayout()}
          </View>
      </View>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
  },
  resultContainer: {
    flex: 2.5,
    justifyContent: 'flex-end',
    backgroundColor: '#718792',
  },
  buttonContainer: {
    flex: 7.5,
    backgroundColor: '#455a64',
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  statusbar:{
    flex:1,
    backgroundColor: '#455a64',
    justifyContent:'center',
    flexDirection:'row',
    alignItems: 'center',
  },settingbutton:{
    flex:2,
    margin:5,
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'center',
  },title:{
    flex:8,
    fontWeight:"700",
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
});

