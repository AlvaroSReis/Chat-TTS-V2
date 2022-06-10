import { StatusBar } from 'expo-status-bar';
import * as Crypto from 'expo-crypto';
import React, { Component} from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-screens';
import 'react-native-gesture-handler'
import 'react-native-safe-area-context'

import Navigation from './navigation/navigator.js'

export default function Apps() {
  return (
    <Navigation/>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
