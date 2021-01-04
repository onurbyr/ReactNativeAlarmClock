import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import InputSpinner from "react-native-input-spinner";
import BluetoothSerial from 'react-native-bluetooth-serial'



function sendData(value){
    BluetoothSerial.write(value)
}

function LedFade() {
    const [display,setDisplay] = useState("none");
    return (
        <View style={styles.container}>
            <Text style={styles.textBt}>Solma Efekti Vermek İstediğiniz Rengi Seçiniz</Text>
            <View style={styles.btContainer}>
            <TouchableOpacity
            style={styles.btRed}
            onPress={() => {
                setDisplay('flex')
                sendData("f"+"r"+")")
                }}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btGreen}
            onPress={() => {
                setDisplay('flex') 
                sendData("f"+"g"+")")
                }}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btBlue}
            onPress={() => {
                setDisplay('flex') 
                sendData("f"+"b"+")")
                }}>
            </TouchableOpacity>
            </View>
            <Text style={[styles.textFade,{display}]}> 
                Solma Efekti Hızı
            </Text>
            <View style={{display}}> 
            <InputSpinner
            max={10}
            min={1}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={1}
            onChange={(num) =>
                { 
                sendData("f"+num+")")
                }
            }
            style={styles.spinner}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#F5FCFF'
    },
    textBt:{
        color:'#656262',
        fontSize:16

    },
    btContainer:{
        flexDirection:'row',
    },
    btRed:{
        width:80,
        height:80,
        backgroundColor:'red',
        margin:10,
        borderRadius:50,
        borderWidth:3,
        borderColor:'#656262'
    },
    btGreen:{
        width:80,
        height:80,
        backgroundColor:'green',
        margin:10,
        borderRadius:50,
        borderWidth:3,
        borderColor:'#656262'
    },
    btBlue:{
        width:80,
        height:80,
        backgroundColor:'blue',
        margin:10,
        borderRadius:50,
        borderWidth:3,
        borderColor:'#656262'
    },
    textFade:{
        color:'#656262',
        fontSize:16,
        marginTop:50,
    },
    spinner: {
        marginTop:10,
        minWidth: 175,
    }
})


export default LedFade;