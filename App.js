

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import CalButton from './CalButton'

const list = [
  ["C","AC","(",")","S"],
  [7,8,9,"+","P"],
  [4,5,6,"-","C"],
  [1,2,3,"×","PI"],
  [0," "," ","÷","H"],
]
export default function App(){
  //double map + 컴포넌트에 key 활용
  const [result, setresult] = useState(0)

  handleOnPress = (data) => {
    console.log(data)
    setresult(data)
  }

  function renderButtonLayout(){
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
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#4CC9F6',
  },
  buttonContainer: {
    flex: 8,
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

