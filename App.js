import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Component/Main';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './Component/Setting';
import History from './Component/History';
import SplashScreen from 'react-native-splash-screen';
import { BackHandler } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  //exit SplashScreen
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  //Android HardWareButton Locked
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])

  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" 
            component={Main}
            options={{headerShown : false}} />
          <Stack.Screen name="Setting" 
            component={Setting} 
            options={{headerShown : false}} />
            <Stack.Screen name="History" 
            component={History} 
            options={{headerShown : false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }