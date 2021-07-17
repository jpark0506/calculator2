import React from 'react';
import { useEffect } from 'react';
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
import SettingsList from 'react-native-settings-list';

export default function HistoryItem({color, date, string, deleteItem}){

    const styles = StyleSheet.create({
        item :{
            height:50,
            width:'100%',
            backgroundColor:color,
            flexDirection:'row',
            alignItems:'center'
        },datetext:{
            flex: 5,
            color:'white',
            textAlign:'center',
        },resultstring:{
            flex:5,
            textAlign:'center',
            color:'white',
            fontSize:26
        },divider:{
            width:"100%",
            height:2,
            backgroundColor:'#FFFFF'
        }
    })
    const showAlert = (date,string) =>
        Alert.alert(
            "해당 항목을 삭제하시겠습니까?",
            string,
            [
            {
                text: "취소",
                onPress: () => {},
                style: "cancel",
            },
            {
                text:"삭제",
                //자식->부모 props전달ㅎㅎ 이제 완벽 활용 가능!
                onPress: () => {deleteItem(date)},
                style:'default'
            }
            ],
            {
            cancelable: true,
            onDismiss: () =>
                {}
            }       
  );
    return(
        <View>
            <TouchableOpacity style = {styles.item} onPress={()=>showAlert(date,string)}>
                <Text style = {styles.datetext}>
                    {date}
                </Text>
                <Text style = {styles.resultstring}>
                    {string}
                </Text>
            </TouchableOpacity>
            <View style = {styles.divider}></View>
        </View>
            
            
    )
}

