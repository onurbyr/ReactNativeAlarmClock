import React, {useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ScrollView,Alert,Image,ToastAndroid } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import Slider from '@react-native-community/slider';
import {openDatabase} from 'react-native-sqlite-storage';
import Images from '../components/Images';

// Connction to access the pre-populated user_db.db
const db = openDatabase({name: 'SmartClock.db', createFromLocation: 1});



function RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function LedModesEdit({navigation,route}) {
  const [name, setName] = useState('');
  const [colour, setColour] = useState('');
  const [brightness, setBrightness] = useState(-1);
  const [image, setImage] = useState('');

  const { modeid } = route.params;
  const { imagename } = route.params;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM ledmodes where id = ?',
              [modeid],
              (tx, results) => {
                var len = results.rows.length;
                  var res = results.rows.item(0);
                  var rgbArr = res.color.split(',');
                  var r=Number(rgbArr[0])
                  var g=Number(rgbArr[1])
                  var b=Number(rgbArr[2])
                  var hex=RGBToHex( r , g , b)

                  if (imagename=="")
                  {
                    sendImage=res.image
                  }
                  else
                  {
                      sendImage=imagename
                  }
                  updateAllStates(res.name, hex, res.brightness,sendImage);

              },
            );
          });

      
    });

    return unsubscribe;
  }, [navigation,route]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={deleteMode}>
            <Image
            style={{width:30, height:30,marginRight:20}}
            source={require('../images/delete.png')}
            />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);





  
  function updateAllStates(name,color,brightness,image) {
    setName(name);
    setColour(color);
    setBrightness(brightness);
    setImage(image);
  };



  function update () {
    //console.log(name, colour, brightness, image);
    if (!name) {
      alert('Lütfen isim alanını doldurunuz.');
      return;
    }
    if (colour=='#NaNNaNNaN' || colour.charAt(0)=='#') {
      alert('Lütfen bir renk seçiniz.');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE ledmodes set name=?, color=? , brightness=?, image=? where id=?',
        [name, colour, brightness, image, modeid],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Başarılı',
              'Mod Başarı ile Güncellendi',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('LedModes'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Güncelleme Başarısız');
        },
      );
    });
  };



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

    function deleteMode () {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM ledmodes where id=?',
            [modeid],
            (tx, results) => {
                navigation.navigate('LedModes')
                ToastAndroid.show('Mod Başarı ile Silindi', ToastAndroid.SHORT);
            },
          );
        });
      };




  return (
    <View style={styles.container}>
        <ScrollView>
        <TouchableOpacity 
        onPress={() => navigation.navigate('LedModesImages',{
        whichpage:"LedModesEdit"
        })}
        style={styles.image}>
        <Image style={{width:50,height:50}}  source={Images[image]} />
        </TouchableOpacity>
        <Text style={styles.imageText}>Resim</Text>

        <Text style={styles.text}>İsim</Text>
        <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={text => setName(text)}>
        </TextInput>
        <Text style={styles.text}>Renk</Text>
 
        <ColorPicker
        hideSliders="true"
         onColorSelected={color => 
             {applyColor(color)}
         }
        style={{width:125,height:125,alignSelf:'center'}}
        oldColor={colour}
        />
        <Text style={styles.text}>Parlaklık</Text>
        <Slider
        style={styles.slider}
        value={brightness}
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
        onPress={update}
        >
            <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>


        </ScrollView>
        
        
    </View>
)
};

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

export default LedModesEdit;