import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import BluetoothConnection from './src/pages/BluetoothConnection'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LedOptions from './src/pages/LedOptions'
import AlarmClock from './src/pages/AlarmClock'
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            labelPosition:'beside-icon',
          }}>
          <Tab.Screen 
          name="Bluetooth"
          component={BluetoothConnection}
          options={{
              tabBarIcon: ({ color, size }) => (
                <IconFeather name="bluetooth" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen 
          name="Led"
          component={LedOptions}
          options={{
              tabBarIcon: ({ color, size }) => (
                <IconEntypo name="light-bulb" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen 
          name="Çalar Saat"
          component={AlarmClock}
          options={{
              tabBarIcon: ({ color, size }) => (
                <IconMaterialCommunityIcons name="alarm" color={color} size={20} />
              ),
            }}
          />
        </Tab.Navigator>
    );
  }




export default function App(){
    return (
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      );
};