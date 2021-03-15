

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Button from './Button'
const list = [
  ["C","AC","(",")","S"],
  [7,8,9,"+","P"],
  [4,5,6,"-","C"],
  [1,2,3,"+","PI"],
  [0,"/","H"],
]
export default function App(){
  
  function renderButtonLayout(){
    const renderButtonLayout = list.map((row, index)=>{
      const renderRow = row.map((button,index)=>{
        return(  
        <Button value = {button} key = {"btn-"+index}>
        </Button>)
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
    <View style ={styles.container}>
        <View style = {styles.resultContainer}>
          <Text style = {styles.resultText}>
            0
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
    flex: 1,
  },
  resultcontainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#4CC9F6',
  },
  buttoncontainer: {
    flex: 8,
    backgroundColor: '#2B697F',
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
  }
});

