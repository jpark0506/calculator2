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
  Alert,
} from 'react-native';
import HistoryItem from './HistoryItem';
import MMKVStorage from "react-native-mmkv-storage";

export default function HistoryList(){
    const [history, setHistory] = useState([])
    useEffect(()=>{
      try{
        getData().then(results=>{console.log(results)
          setHistory(results)})
      
      }catch(error){
        console.log(error)
        Alert(error.toString())
      }
    },[])
    const MMKV = new MMKVStorage.Loader().initialize();
    async function getData(){
      let strings = await MMKV.indexer.strings.getAll();
      return strings
    }
    function layout(){
        const layout = history.map((data)=>{
            <HistoryItem key = {data[0]} date ={data[0]} string={data[1]}>
            </HistoryItem>
        })
        return layout
    }
    return (
      <View>
          {layout()}
      </View>  
    )
}