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

  let listItemView = (item,index) => {
    return (
      <View 
        key={item.user_id}
        style={[{ backgroundColor: 'white', flex: 1,margin:20 }, index%2==0 ? { marginRight: 5 } : { marginLeft: 5 } ]}

        >
        <Text>Id: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Color: {item.color}</Text>
        <Text>Brightness: {item.brightness}</Text>
        <Text>Image: {item.image}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1 ,backgroundColor:'#F5FCFF'}}>
        <View style={{flex: 2,flexDirection:'row'}}>
          <FlatList
            numColumns={2}
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item,index}) => listItemView(item,index)}
          />
        </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;