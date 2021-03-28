import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './Setting';
import History from './History';

const Stack = createStackNavigator();


export default function App() {
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