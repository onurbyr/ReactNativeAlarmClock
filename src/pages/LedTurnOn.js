import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Icon from 'react-native-vector-icons/Entypo';



export default class LedTurnOn extends Component {
    toggleSwitch(){
        BluetoothSerial.write('T')
        .then((res) => {
          console.log(res);
          console.log('Successfuly wrote to device')
          this.setState({ connected: true })
        })
        .catch((err) => console.log(err.message))
      }
    render() {
        return (
            <View style={styles.container}>
                
                <TouchableOpacity onPress={this.toggleSwitch.bind(this)}>
                    <Icon name="light-bulb" type="Entypo" size={100} color="#ebc334" />
                </TouchableOpacity>
            </View>

        )
    }
}





const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
    
})
