import { Component } from 'react'

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login.js'
import Chat from '../screens/chat.js'
import Profile from '../screens/profile.js'
import Cadastro from '../screens/cadastro.js'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function Navigation(){
  return(
    <NavigationContainer>
      <MainNavigatort/>
    </NavigationContainer>
  )
}


function MainNavigatort({Component}) {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Login"  component={Login}/>
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    )
}

function Home({Component}) {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name ="Chat" component={Chat} />
          <Drawer.Screen name ="Profile" component={Profile} />
        </Drawer.Navigator>
    )
  }
/*
function Home() {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name ="Chat" component={Chat} />
          <Drawer.Screen name ="Profile" component={Profile} />
        </Drawer.Navigator>
    )
  }

  <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login"  component={Login}/>
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
      */