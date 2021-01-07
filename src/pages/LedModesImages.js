import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView } from 'react-native'

function LedModesImages() {
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/half-moon.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/brightness.png')}
                />
            </TouchableOpacity> 
            </View>
            
            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/house.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/sunrise.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/candle.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/romantic-dinner.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/bell.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/work.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/table-lamp.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/clocks.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/barbell.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/game-controller.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/confetti.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/music.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}>
                <Image
                style={styles.image}
                source={require('../images/popcorn.png')}
                />
            </TouchableOpacity> 
            </View>




     


           </View>
           </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap',
        backgroundColor:'#F5FCFF'
    },
    buttonWrapper:{
        flexBasis: '33%',
        borderWidth:1,
        borderColor:'#EFEFEF',
        height:120,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
     
      
    },
    button:{
        width:100,
        height:100,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#BAD9D3'

    

    },
    image:{
        width:60,
        height:60
    }

})


export default LedModesImages;