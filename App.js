import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import BluetoothConnection from './src/pages/BluetoothConnection'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LedTurnOn from './src/pages/LedTurnOn'
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';







export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Tab.Navigator         tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelPosition:'beside-icon',
        }}>
        <Tab.Screen 
        name="Bluetooth"
        component={BluetoothConnection}
        options={{
            tabBarIcon: ({ color, size }) => (
              <IconFeather name="bluetooth" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
        name="Led"
        component={LedTurnOn}
        options={{
            tabBarIcon: ({ color, size }) => (
              <IconEntypo name="light-bulb" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}






const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({

})
