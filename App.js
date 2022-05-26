import { StatusBar } from 'expo-status-bar';
import * as ExpoCrypto from 'expo-crypto';
import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-screens';
import 'react-native-gesture-handler'
import 'react-native-safe-area-context'

import Login from './screens/login.js'
import Chat from './screens/chat.js'
import Profile from './screens/profile.js'
import Cadastro from './screens/cadastro.js'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login"  component={Login}/>
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
  )

  function Home() {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name ="Chat" component={Chat} />
          <Drawer.Screen name ="Profile" component={Profile} />
        </Drawer.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
