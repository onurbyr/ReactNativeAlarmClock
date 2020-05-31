import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import BluetoothConnection from './src/pages/BluetoothConnection'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LedTurnOn from './src/pages/LedTurnOn'







export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Tab.Navigator         tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelPosition:'beside-icon',
        }}>
        <Tab.Screen name="Led" component={LedTurnOn} />
        <Tab.Screen name="Bluetooth" component={BluetoothConnection} />
        
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}






const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({

})
