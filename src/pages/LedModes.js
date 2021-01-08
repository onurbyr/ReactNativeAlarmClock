import React, {useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList,SafeAreaView,Image,Dimensions  } from 'react-native'
import {openDatabase} from 'react-native-sqlite-storage';
import Images from '../components/Images';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;


const db = openDatabase({name: 'SmartClock.db', createFromLocation: 1});


function LedModes({navigation}) {  
    const [flatListItems, setFlatListItems] = useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM ledmodes',
                [],
                (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                  setFlatListItems(temp);
                });
              });          
        });
    
        return unsubscribe;
      }, [navigation]);


      function listItemView (item){
        return (
          <View 
            key={item.id}
            style={styles.buttonWrapper}>
            <TouchableOpacity>
            <Image style={{width:100,height:100}}  source={Images[item.image]} />
            </TouchableOpacity>
            <Text style={styles.flatNameText}>{item.name}</Text>

            
          </View>
        );
      };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
            onPress={() => navigation.navigate('LedModesAdd')}
            style={styles.addButton}>
            <IconMaterialIcons name="add" type="MaterialIcons" size={60} color="#F5FCFF" />
            </TouchableOpacity>
            <Text style={styles.addButtonText}>Mod Ekle</Text>

            <FlatList 
            numColumns={2}
            data={flatListItems}
            //ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
            />
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container:{
        flex: 1 ,
        backgroundColor:'#F5FCFF'
    },
    buttonWrapper:{
        backgroundColor: '#F5FCFF', 
        flex: 1/2,
        marginLeft:1,
        marginBottom:1,
        height:windowWidth/2-10,
        alignItems:'center',
        justifyContent:'center'
    },
    addButton:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:75,
        height:75,
        backgroundColor:'#C0C0C0',
        borderRadius:37.5,
        marginTop:20
    },
    addButtonText:{
        alignSelf:'center',
        marginTop:10,
        fontSize:16,
        color:'#666666'

    },
    flatNameText:{
        color:'#666666',
        marginTop:10,
        fontSize:16
    }
})


export default  LedModes; 