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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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
      margin: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 26,
    }
  });

export default CalButton