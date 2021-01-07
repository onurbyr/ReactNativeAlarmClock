import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

// Connction to access the pre-populated user_db.db
const db = openDatabase({name: 'SmartClock.db', createFromLocation: 1});

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
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
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  let listItemView = (item) => {
    return (
      <View 
        key={item.user_id}
        style={{backgroundColor: 'white', padding: 20,flex:1}}>
        <Text>Id: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Color: {item.color}</Text>
        <Text>Brightness: {item.brightness}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 2,flexDirection:'row'}}>
          <FlatList
             numColumns={2}
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;