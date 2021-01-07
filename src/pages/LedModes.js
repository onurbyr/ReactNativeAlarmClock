import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'




function LedModes({navigation}) {  
    return (
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('ListData')}>
                <Text>Button</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('LedModesAdd')}>
                <Text>Mod Ekle</Text>
            </TouchableOpacity>
        </View>
    )
}





const styles = StyleSheet.create({})


export default  LedModes; 