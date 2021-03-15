

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';

import CalButton from './CalButton'
import {calculateResult, isOperator, unclickable} from './Util'

const list = [
  ["C","AC","(",")","S"],
  [7,8,9,"+","P"],
  [4,5,6,"-","C"],
  [1,2,3,"×","π"],
  [0,".","=","÷","H"],
]
export default function App(){
  //double map + 컴포넌트에 key 활용
  const [result, setResult] = useState(0)
  const [unit, setUnit] = useState({firstnum:"", lastnum:"", operator:""})
  
  //이런식으로 놔두면 렌더링 될 때마다 초기화
  //계산 결과 저장
  const history = []
  const createUnclickableDialog = () =>
    Alert.alert(
      "Unclickable",
      "don't click this button",
      [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
  //이거 모듈화 하자
  //string 연산 알고리즘 구현
  handleresultString = (data) => {
    console.log(unit)
    //.여러개 방지
    //왜 switchcase 문으로는 filtering이 안될까
    if(data == "C"){
      setResult(0)
    }else if(data=="AC"){
      setResult(0)
      setUnit(prevState => {return{...prevState, firstnum: "", operator: "",lastnum:""}})
    }else if(isOperator(data)){
      if(unit.firstnum==""){
        setUnit(prevState => {return{...prevState,firstnum:result,operator: data, lastnum:""}})
        console.log(unit)
        setResult(0)
      }
      
      else{
        setUnit(prevState =>{return{...prevState, lastnum:result}})
        temp = calculateResult(unit).toString()
        setResult(temp)
        console.log(unit)
        unit.firstnum = temp
        unit.operator = (data != "=") ? data : ""
        unit.lastnum = ""
      }
      
    }else if(unclickable(data)){
      createUnclickableDialog()
    }else{
      if(result == "0"&&data !="."){
        setResult(data.toString())
      }else{
        setResult(result.toString().concat(data))
      }
    }
  }

  handleOnPress = (data) => {
    console.log(data)
    handleresultString(data)
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

    <View style ={styles.container}>
        <View style = {styles.resultContainer}>
          <Text style = {styles.resultText}>
            {result}
          </Text>
        </View>
        <View style = {styles.buttonContainer}>
          {renderButtonLayout()}
        </View>
    </View>
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
    backgroundColor: '#4CC9F6',
  },
  buttonContainer: {
    flex: 7.5,
    backgroundColor: '#2B697F',
  },
  resultText: {
    color: 'black',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  }
});

