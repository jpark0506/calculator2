import React from 'react';
import {
    ProgressViewIOSComponent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// props 비구조화 할당
function CalButton({value,handleOnPress}){

    return(
        <TouchableOpacity  style={styles.container} onPress={()=>handleOnPress(value)}>
          
            <Text style={styles.text}>
                {value}
            </Text>
          
            
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      backgroundColor: '#23374D',
      justifyContent: 'center',
      alignItems: 'center',
      
      borderColor: "#FFFFFF",
      borderStyle: "solid",
      borderWidth: 2,
    },
   
    text: {
      fontFamily:'NeoDunggeunmoCode-Regular',
      color: 'white',
      fontSize: 26,
     
      
      
    }
  });

export default CalButton