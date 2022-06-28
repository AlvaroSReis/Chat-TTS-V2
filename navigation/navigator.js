import { Component } from 'react'

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login.js'
import Chat from '../screens/chat.js'
import Profile from '../screens/profile.js'
import Cadastro from '../screens/cadastro.js'


const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

export default function Navigation(){
  return(
    <NavigationContainer>
      <MainNavigatort/>
    </NavigationContainer>
  )
}


function MainNavigatort({Component}) {
    return (
        <Stack.Navigator >
          <Stack.Screen name="Login"  component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    )
}

function Home({Component}) {
    return (
        <Stack2.Navigator>
          <Stack2.Screen 
          name ="Chat" 
          component={Chat}
          options={{headerShown: false}}
          />
        </Stack2.Navigator>
    )
  }
