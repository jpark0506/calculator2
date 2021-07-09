import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Component/Main';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './Component/Setting';
import History from './Component/History';
import MMKVStorage from "react-native-mmkv-storage";
const Stack = createStackNavigator();


export default function App() {
  const MMKV = new MMKVStorage.Loader().initialize();
  MMKV.indexer.strings.hasKey("theme").then((result) => {
    if (result) {
      // if true do this.
    } else {
      MMKV.setString("theme", "blue");
    }
  });
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