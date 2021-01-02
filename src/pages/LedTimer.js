import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import InputSpinner from "react-native-input-spinner";
import { color } from 'react-native-reanimated';
import BluetoothSerial from 'react-native-bluetooth-serial'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


function sendData(value){
    BluetoothSerial.write(value)
}




function LedTimer() {
    const [number,setNumber] = useState(1);
    const [minute,setMinute] = useState(-1);
    const [second,setSecond] = useState(-1);
    const [display,setDisplay] = useState("none");


    useEffect(() => {
        const toggle = setInterval(() => {
            sendData("x)")
            BluetoothSerial.readFromDevice().then((data) => {

                var dataArr = data.split(',');

                var remMin=dataArr[0];
                var remSec=dataArr[1];

                setMinute(remMin);
                setSecond(remSec);

            });

            if (minute>=0 && second>=0 && second!=undefined)
            {
                setDisplay("flex")
            }
            else {
                setDisplay("none")
            }

        }, 1000);
   
        return () => clearInterval(toggle);
     })



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
        <TouchableOpacity style={styles.offButton}
        onPress={() => sendData("t"+number+")")}
        >
            <IconMaterialCommunityIcons name="lightbulb-off"  size={50} color="#FF6A4F" />
            <Text style={styles.offButtonText} >{number} Dakika Sonra Işığı Kapat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cancelButton,{display}]}
        onPress={() => sendData("c)")}
        >
            <IconMaterialCommunityIcons name="cancel"  size={50} color="#E6707B" />
            <Text style={styles.cancelButtonText} >Kapatma İşlemini İptal Et</Text>
        </TouchableOpacity>

        <Text style={[styles.textWillOff,{display}]}> 
        {minute} Dakika {second} Saniye Sonra Işık Kapanacak
        </Text>

    
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
        minWidth: 300
    },
    offButton:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center'
    },
    offButtonText:{
        fontSize:16,
        color:'#FF6A4F'
    },
    cancelButton:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center'
    },
    cancelButtonText:{
        fontSize:16,
        color:'#E6707B'
    },
    textWillOff:{
        marginTop:20,
        fontSize:16,
        color:'#FF6A4F'
    }
})


export default LedTimer;