import React from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  
  View,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import SettingsList from 'react-native-settings-list';

export default function HistoryItem({color, date, string, deleteItem}){
    

    const styles = StyleSheet.create({
        item :{
            height:100,
            width:'95%',
            backgroundColor:color,
            flexDirection:'column',
            alignItems:'center',
            borderColor: "#FFFFFF",
            borderStyle: "solid",
            borderWidth: 2,
            borderRadius:20,
            margin:10
        },datetext:{
            marginTop:20,
            flex: 5,
            color:'white',
            fontFamily:'NeoDunggeunmoCode-Regular',
            textAlign:'center',
        },resultstring:{
            flex:5,
            textAlign:'center',
            color:'white',
            fontSize:26,
            fontFamily:'NeoDunggeunmoCode-Regular',
            marginBottom:20
        },divider:{
            width:"100%",
            height:2,
            backgroundColor:'#FFFFFF'
        }
    })
    const copyToClipboard = (string) => {
        console.log("copyToClipboard", string)
        Clipboard.setString(string);
        let temp = string.concat("이 복사되었습니다.");
        showOKAlert(temp);
    }
    const showOKAlert = (string) => {
        
        console.log("showOKAlert",string)
        Alert.alert(
            "복사 성공",
            string,[
           {
               text: "확인",
               onPress: () => {},
               style: "cancel",
           }],
           {cancelable:true}
       )
    }
    const showAlert = (date,string) =>{
        Alert.alert(
            "할 작업을 선택해주세요",
            string,
            [
            {
                text: "취소",
                onPress: () => {},
                style: "cancel",
            },
            
            
            {
                text: "복사",
                onPress: () => {copyToClipboard(string)},
            },
            {
                text:"삭제",
                //자식->부모 props전달ㅎㅎ 이제 완벽 활용 가능!
                onPress: () => {deleteItem(date)},
                
            },
            ],
            {
            cancelable: true,
            onDismiss: () =>
                {}
            }       
  )};
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
            {/* <View style = {styles.divider}></View> */}
        </View>
            
            
    )
}

