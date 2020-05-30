import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'



export default class LedTurnOn extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                    
                <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Bluetooth')} />
            </View>
        )
    }
}





const styles = StyleSheet.create({
    
})
