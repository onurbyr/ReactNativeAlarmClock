import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity,SafeAreaView } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import LedColor from './LedColor'
import LedTimer from './LedTimer'
import LedBrightness from './LedBrightness'
import LedFade from './LedFade'
import LedModes from './LedModes'
import LedModesAdd from './LedModesAdd'
import LedModesImages from './LedModesImages'
import LedModesEdit from './LedModesEdit'
import LedAutoBrightness from './LedAutoBrightness'


function sendData(value){
    BluetoothSerial.write(value)
}




function toggleSwitch(isOn,setIsOn) {
    if (!isOn)
    {
        sendData("ON)")
        setIsOn(isOn=true);
    }
    else if (isOn)
    {
        sendData("OFF)")
        setIsOn(isOn=false);
    }
}


function LedSettings({navigation}) {
    const [isOn, setIsOn] = useState(false)
    const [brightness,setBrightness] = useState(100);

    //When focused to tab
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            sendData("B2)")
            setTimeout(function()
            {
                BluetoothSerial.readFromDevice().then((data) => {
    
                    var br = ~~data;
                    setBrightness(br)
    
                });
            }, 500);

        });
    
        return unsubscribe;
      }, []);



        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}}
                colors={['#54ACDA','#C63F7A']} 
                style={styles.header}>
                <TouchableOpacity 
                style={styles.icon}
                onPress={() => toggleSwitch(isOn,setIsOn)}
                >
                    <IconAntDesign name="poweroff" type="AntDesign" size={50} color="#ebc334" />
                    
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.onOffText}>
                        Işığı Aç/Kapat
                    </Text>
                    <Text style={styles.brightnessText}>
                        Parlaklık:%{brightness}
                    </Text>
                    
                </View>

                </LinearGradient>
                <View style={styles.settings}>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedColor')}>
                        <IconMaterialIcons name="colorize"  size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Işık Rengini Ayarla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedTimer')}>
                        <IconMaterialCommunityIcons name="camera-timer" size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Kapanma Süresi Belirle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedBrightness')}>
                        <IconMaterialCommunityIcons name="brightness-percent" type="MaterialIcons" size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Parlaklık Ayarla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedModes')}>
                         <Icon name="light-bulb"size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Işık Modları</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedAutoBrightness')}>
                        <IconMaterialCommunityIcons name="brightness-auto"  size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Otomatik Parlaklık</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsInside}
                    onPress={() => navigation.navigate('LedFade')}>
                        <IconMaterialCommunityIcons name="light-switch"  size={35} color="#C63F7A" />
                        <Text style={styles.settingsInsideText}>Solma Efekti</Text>
                    </TouchableOpacity>


                </View>

                

            </SafeAreaView>

        )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF'
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
        <HomeStack.Screen name="LedColor" options={{ title: 'Renk Ayarla',headerTintColor: '#656262' }}  component={LedColor} />
        <HomeStack.Screen name="LedTimer" options={{ title: 'Kapanma Süresi Belirle',headerTintColor: '#656262' }}  component={LedTimer} />
        <HomeStack.Screen name="LedBrightness" options={{ title: 'Parlaklık Ayarla',headerTintColor: '#656262' }}  component={LedBrightness} />
        <HomeStack.Screen name="LedFade" options={{ title: 'Solma Efekti',headerTintColor: '#656262' }}  component={LedFade} />
        <HomeStack.Screen name="LedModes" options={{ title: 'Işık Modları',headerTintColor: '#656262'}}  component={LedModes} />
        <HomeStack.Screen name="LedAutoBrightness" options={{ title: 'Otomatik Parlaklık',headerTintColor: '#656262'}}  component={LedAutoBrightness} />
        <HomeStack.Screen
        name="LedModesAdd" 
        initialParams={{ imagename: "" }}
        options={{ 
        title: 'Işık Modu Ekle',
        headerTintColor: '#656262',
       
        //gestureEnabled:true,
        //gestureDirection:"horizontal",
        ...TransitionPresets.SlideFromRightIOS
        }}
        component={LedModesAdd} />

        <HomeStack.Screen
        name="LedModesImages" 
        initialParams={{ whichpage: "" }}
        options={{ 
        title: 'Mod Resmi Seç',
        headerTintColor: '#656262',
        gestureEnabled:true,
        gestureDirection:"horizontal",
        ...TransitionPresets.SlideFromRightIOS
        }}
        component={LedModesImages} />

        <HomeStack.Screen
        name="LedModesEdit" 
        initialParams={{ modeid: "" ,imagename:""}}
        options={{ 
        title: 'Modu Düzenle',
        headerTintColor: '#656262',
        gestureEnabled:true,
        gestureDirection:"horizontal",
        ...TransitionPresets.SlideFromRightIOS
        }}
        component={LedModesEdit} />
        
      </HomeStack.Navigator>
    );
  }

