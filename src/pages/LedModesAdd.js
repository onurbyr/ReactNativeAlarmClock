import React, {useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ScrollView,ToastAndroid,Alert,Image } from 'react-native'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ColorPicker } from 'react-native-color-picker'
import Slider from '@react-native-community/slider';
import {openDatabase} from 'react-native-sqlite-storage';
import Images from '../components/Images';

const db = openDatabase({name: 'SmartClock.db', createFromLocation: 1});



function LedModesAdd({navigation,route}) {
    const [name, setName] = useState('');
    const [colour, setColour] = useState('');
    const [brightness, setBrightness] = useState('');
    const [display,setDisplay] = useState("flex");
    const [displayNew,setDisplayNew] = useState("none");

    const { imagename } = route.params;
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (imagename=="")
            {
                setDisplay("flex")
                setDisplayNew("none")
            }
            else 
            {
                setDisplay("none")
                setDisplayNew("flex")
            }

          
        });
    
        return unsubscribe;
      }, [navigation,route]);


    function addMode(){
        if (!imagename) {
            alert('Lütfen resim seçiniz.');
            return;
          }
        if (!name) {
            alert('Lütfen isim alanını doldurun.');
            return;
          }
        if (!colour) {
            alert('Lütfen renk seçiniz.');
            return;
          }
        if (!brightness) {
            alert('Lütfen parlaklık ayarlayınız.');
            return;
          }

          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO ledmodes (name, color, brightness,image) VALUES (?,?,?,?)',
              [name, colour, brightness,imagename],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Mod Başarı ile Kaydedildi',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('LedModes'),
                          },
                        ],
                        {cancelable: false},
                      );
                    }
                else alert('Kaydedilmedi');
                },
            );
          });

    }


    function convertHex(hexCode){
        var hex = hexCode.replace('#','');
    
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
    
        var r = parseInt(hex.substring(0,2), 16),
            g = parseInt(hex.substring(2,4), 16),
            b = parseInt(hex.substring(4,6), 16)
    
        return [r,g,b];
    }
    
    function applyColor(color){
        var rgb=convertHex(color);
        var rgbs=rgb.toString();
        setColour(rgbs);
        ToastAndroid.show('Renk Seçildi', ToastAndroid.SHORT);
    }




    return (
        <View style={styles.container}>
            <ScrollView>
            <TouchableOpacity 
            onPress={() => navigation.navigate('LedModesImages')}
            style={styles.image}>
            <IconMaterialIcons style={{display}} name="add" type="MaterialIcons" size={60} color="#F5FCFF" />
            <Image style={{width:50,height:50,display:displayNew}}  source={Images[imagename]} />
            </TouchableOpacity>
            <Text style={styles.imageText}>Resim Ekle</Text>

            <Text style={styles.text}>İsim</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={text => setName(text)}>
            </TextInput>
            <Text style={styles.text}>Renk</Text>
     
            <ColorPicker
            hideSliders="true"
            onColorSelected={color => 
                {applyColor(color)}
            }
            style={{width:125,height:125,alignSelf:'center'}}
            />
            <Text style={styles.text}>Parlaklık</Text>
            <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#FED842"
            maximumTrackTintColor="red"
            thumbTintColor={'#a28cde'}
            onSlidingComplete={value =>setBrightness(value)}
            />  
            
            <TouchableOpacity 
            style={styles.saveButton}
            onPress={addMode}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
            </ScrollView>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF'
    },
    image:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:75,
        height:75,
        backgroundColor:'#C0C0C0',
        borderRadius:50,
        marginTop:20
    },
    imageText:{
        marginTop:10,
        alignSelf:'center',
    },
    text:{
        color:'#5F5F5F',
        marginLeft:35,
        marginTop:10
    },
    textInput:{
        backgroundColor:'#eee6f2',
        borderRadius:20,
        marginLeft:30,
        marginRight:30,
        marginTop:10
    },
    saveButton:{
        height:50,
        backgroundColor:'#a28cde',
        borderRadius:40,
        marginLeft:30,
        marginRight:30,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20
    },
    saveButtonText:{
        color:'white',
    },
    slider:{
        marginTop:10,
        marginLeft:25,
        marginRight:30,

    }

})

export default LedModesAdd;
