import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



function LedBrightness() {
    const [brightness,setBrightness] = useState(1);
    return (
        <View style={styles.container}>
            <Text style={styles.brText}>Led Parlaklığını Ayarla</Text>
            <Slider
            style={{width: 250, height: 75 }}
            minimumValue={0}
            maximumValue={250}
            step={1}
            minimumTrackTintColor="#2D6C9C"
            maximumTrackTintColor="red"
            thumbTintColor={'#2D6C9C'}
            //thumbImage={require('../images/slider.png')}
            onSlidingComplete={(value) =>setBrightness(value)}
            />
            <TouchableOpacity onPress={() => alert(brightness)}><Text>dddd</Text></TouchableOpacity>
       
        
            
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
          color:'#2E6D9C',
          fontSize:20
      }



})



export default LedBrightness;