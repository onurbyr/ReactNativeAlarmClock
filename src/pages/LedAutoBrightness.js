import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'

function LedAutoBrightness() {
   function open()
   {
    BluetoothSerial.write("l)")

   }
   function close()
   {
    BluetoothSerial.write("n)")
   }
    return (
      <View>
        <TouchableOpacity
        onPress={open}
        style={{width:50,height:50,borderWidth:4,marginBottom:100}}>
          <Text>Aç</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={close}
        style={{width:50,height:50,borderWidth:4}}>
          <Text>Kapa</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({})

export default LedAutoBrightness;
