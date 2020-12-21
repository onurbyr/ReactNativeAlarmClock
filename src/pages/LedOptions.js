import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity,SafeAreaView } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
import LedColor from './LedColor'


const toggleSwitch =()=>{
    BluetoothSerial.write('T')
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device')
      this.setState({ connected: true })
    })
    .catch((err) => console.log(err.message))
}


function LedSettings({navigation}) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}}
                colors={['#54ACDA','#C63F7A']} 
                style={styles.header}>
                <TouchableOpacity 
                style={styles.icon}
                onPress={toggleSwitch}
                >
                    <IconAntDesign name="poweroff" type="AntDesign" size={50} color="#ebc334" />
                    
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.onOffText}>
                        Işığı Aç/Kapat
                    </Text>
                    <Text style={styles.brightnessText}>
                        Parlaklık:%30
                    </Text>
                    
                </View>

                </LinearGradient>
                <View style={styles.settings}>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedColor')}>
                        <IconMaterialIcons name="colorize"  size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Işık Rengini Ayarla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}>
                        <IconMaterialCommunityIcons name="camera-timer" size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Kapanma Süresi Belirle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}>
                        <IconMaterialIcons name="brightness-6" type="MaterialIcons" size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Parlaklık Ayarla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}>
                         <Icon name="light-bulb"size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Işık Modları</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}>
                        <IconFeather name="camera"  size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Renk Algıla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}>
                        <IconMaterialCommunityIcons name="light-switch"  size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Aralıklı Yanma</Text>
                    </TouchableOpacity>


                </View>

                

            </SafeAreaView>

        )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center',
        //justifyContent:'center'
    },
    header:{
        flex:1,
        flexDirection:'row',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#929292',
        margin:20,
        backgroundColor:'#FF9F91',
        alignItems:'center'
    },
    settings:{
        flex:4,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#929292',
        marginHorizontal:20,
        marginBottom:30,

    },
    icon:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    info:{
        flex:2,
        borderColor:'red'
    },
    onOffText:{
        color:'white',
        fontSize:20,
        marginBottom:5

    },
    brightnessText:{
        color:'white',
        fontSize:14
    },
    settingsInside:{
        flex:1,
        flexDirection:'row',
        margin:15,
        alignItems:'center'
        
    },
    settingsInsideText:{
        marginLeft:15,
        fontSize:18,
        color:'#656262'

    }
    
})


const HomeStack = createStackNavigator();

export default function LedOptions() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
         name="LedSettings"
         options={() => ({ 
             title: 'Led Ayarları',
             headerTitleAlign: 'center',
             headerTintColor: '#656262',
             })}
         component={LedSettings}/>
        <HomeStack.Screen name="LedColor" options={{ title: 'Renk Ayarla' }}  component={LedColor} />
      </HomeStack.Navigator>
    );
  }

