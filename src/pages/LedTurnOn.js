import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo';



export default class LedTurnOn extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                <TouchableOpacity>
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
