import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ToastAndroid } from 'react-native'
import Slider from '@react-native-community/slider';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BluetoothSerial from 'react-native-bluetooth-serial'

function sendData(value){
    BluetoothSerial.write(value)
}



function LedBrightness() {
    const [brightness,setBrightness] = useState(100);

    useEffect(() => {
        sendData("B2)")
        setTimeout(function()
        {
            BluetoothSerial.readFromDevice().then((data) => {

                var br = ~~data;
                setBrightness(br)

            });
        }, 300);
 
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.brText}>Led Parlaklığını Ayarla</Text>
            <Slider
            style={{width: 300, height: 75 }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#FED842"
            maximumTrackTintColor="red"
            // thumbTintColor={'#2D6C9C'}
            thumbImage={require('../images/brightness.png')}
            value={brightness}
            onSlidingComplete={value =>setBrightness(value)}
            />  
            <TouchableOpacity style={styles.brButton}
            onPress={() => {
             sendData("b"+brightness+")")
             ToastAndroid.show('Parlaklık Ayarlandı', ToastAndroid.SHORT);
             }}>
            <IconMaterialCommunityIcons name="brightness-6"  size={40} color="#FF9A8A" />
            <Text style={styles.brButtonText} >Parlaklık Ayarla</Text>
            </TouchableOpacity>

            
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
      },
      brText:{
          color:'#8D8B8B',
          fontSize:20
      },
      brButton:{
        flexDirection:'row',
        alignItems:'center'
      },
      brButtonText:{
        fontSize:16,
        color:'#8D8B8B'
      }

})



export default LedBrightness;