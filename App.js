import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Component/Main';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './Component/Setting';
import History from './Component/History';
import SplashScreen from 'react-native-splash-screen';
import { BackHandler } from 'react-native';
import HOC from './hoc/HOC';
const Stack = createStackNavigator();


export default function App() {
  const devmode = false;
  //스플래시 액티비티 종료
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
            component={HOC(Main,devmode)}
            options={{headerShown : false}} />
          <Stack.Screen name="Setting" 
            component={HOC(Setting,devmode)} 
            options={{headerShown : false}} />
            <Stack.Screen name="History" 
            component={HOC(History,devmode)} 
            options={{headerShown : false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }