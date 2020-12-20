import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { TriangleColorPicker } from 'react-native-color-picker'



function convertHex(hexCode){
    var hex = hexCode.replace('#','');

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    var r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16);

    return [r,g,b];
}


 function LedColor () {     
    return(
        <View style={{flex: 1, padding: 45, backgroundColor: '#212021'}}>
        <Text style={{color: 'white'}}>React Native Color Picker - Uncontrolled</Text>
        <TriangleColorPicker
        //   onColorSelected={color => alert(`Color selected: ${color}`)}
          onColorSelected={color => 
            {var rgb=convertHex(color);
                const r=rgb[0];
                const g=rgb[1];
                const b=rgb[2];
                //alert(r);
            }
        }
          style={{flex: 1}}
        />
      </View>
    )
}

const styles = StyleSheet.create({})


export default LedColor;