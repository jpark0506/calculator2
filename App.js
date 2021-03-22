import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import Setting from './Setting';

const Drawer = createDrawerNavigator();


export default function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Main} />
          <Drawer.Screen name="Notifications" component={Setting} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }