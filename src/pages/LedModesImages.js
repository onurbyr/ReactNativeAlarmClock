import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView } from 'react-native'

function LedModesImages({navigation,route}) {
    const { whichpage } = route.params;
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'moon'
            })}>
                <Image
                style={styles.image}
                source={require('../images/moon.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'brightness'
            })}>
                <Image
                style={styles.image}
                source={require('../images/brightness.png')}
                />
            </TouchableOpacity> 
            </View>
            
            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'house'
            })}>
                <Image
                style={styles.image}
                source={require('../images/house.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'sunrise'
            })}>
                <Image
                style={styles.image}
                source={require('../images/sunrise.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'candle'
            })}>
                <Image
                style={styles.image}
                source={require('../images/candle.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'dinner'
            })}>
                <Image
                style={styles.image}
                source={require('../images/dinner.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'bell'
            })}>
                <Image
                style={styles.image}
                source={require('../images/bell.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'work'
            })}>
                <Image
                style={styles.image}
                source={require('../images/work.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'lamp'
            })}>
                <Image
                style={styles.image}
                source={require('../images/lamp.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'clocks'
            })}>
                <Image
                style={styles.image}
                source={require('../images/clocks.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'barbell'
            })}>
                <Image
                style={styles.image}
                source={require('../images/barbell.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'controller'
            })}>
                <Image
                style={styles.image}
                source={require('../images/controller.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'confetti'
            })}>
                <Image
                style={styles.image}
                source={require('../images/confetti.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'music'
            })}>
                <Image
                style={styles.image}
                source={require('../images/music.png')}
                />
            </TouchableOpacity> 
            </View>

            <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(whichpage,{
                imagename:'popcorn'
            })}>
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