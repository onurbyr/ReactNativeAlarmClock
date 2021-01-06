import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import listdata from '../../listdata.js'  //Delete Later
import { Easing } from 'react-native-reanimated';


function LedModes({navigation}) {  //Update Later
    return (
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('ListData')}>
                <Text>Button</Text>
            </TouchableOpacity>
        </View>
    )
}




const Stack = createStackNavigator(); //Delete Later
function MyStack() { //Delete Later
    return (
      <Stack.Navigator
       screenOptions={{
           gestureEnabled:true,
           gestureDirection:"horizontal",
           ...TransitionPresets.SlideFromRightIOS
       }}
      >
        <Stack.Screen name="Home" component={LedModes} />
        <Stack.Screen name="ListData" component={listdata} />
      </Stack.Navigator>
    );
  }




const styles = StyleSheet.create({})


export default  MyStack; //Update Later