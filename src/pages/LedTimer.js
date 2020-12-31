import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import InputSpinner from "react-native-input-spinner";
import { color } from 'react-native-reanimated';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



function LedTimer() {
    const [number,setNumber] = useState(1);
    return (
        <View style={styles.container}>
        <Text style={styles.closeText}> Kapanma Süresini Belirle </Text>
        <InputSpinner
        max={60}
        min={1}
        step={1}
        colorMax={"#f04048"}
        colorMin={"#40c5f4"}
        value={number}
        onChange={(num) => setNumber(num)}

        style={styles.spinner}
        rounded={false}
        showBorder/>
        <TouchableOpacity style={styles.offButton}>
            <IconMaterialCommunityIcons name="lightbulb-off"  size={50} color="#FF6A4F" />
            <Text style={styles.offButtonText} >{number} Dakika Sonra Işığı Kapat</Text>
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    closeText:{
        fontSize:16,
        marginBottom:5,
        color:'#3D525F'
    },
    spinner: {
        minWidth: 300,
        marginBottom:8
    },
    offButton:{
        flexDirection:'row',
        alignItems:'center'
    },
    offButtonText:{
        fontSize:16,
        color:'#FF6A4F'
    }
})


export default LedTimer;