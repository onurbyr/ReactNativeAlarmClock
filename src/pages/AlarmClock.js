import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  ToastAndroid
} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import { SwipeListView } from 'react-native-swipe-list-view';

const db = openDatabase({name: 'SmartClock.db', createFromLocation: 1});

function AlarmClock() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [flatListItems, setFlatListItems] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    listAlarms();
  }, []);

  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(date) {
    var timevar = date.getHours() + ':' + date.getMinutes();
    addAlarm(timevar);
    hideDatePicker();
    listAlarms();
  }

  function listAlarms() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM alarmtimes', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }

  function addAlarm(timevar) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO alarmtimes (time, isEnabled) VALUES (?,?)',
        [timevar, 'true'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Alarm Kaydedilmedi');
        },
      );
    });
  }

  function update(isEnabled, id) {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE alarmtimes set isEnabled=? where id=?',
        [isEnabled, id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
          } else alert('Güncelleme Başarısız');
        },
      );
    });
  }

  function deleteAlarm (id) {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM alarmtimes where id=?',
        [id],
        (tx, results) => {
            //ToastAndroid.show('Başarı ile Silindi', ToastAndroid.SHORT);
        },
      );
    });
  };

  function toggleSwitch(prev, id) {
    update((!prev).toString(), id);
    listAlarms();
  }

  function timeAddZero(time){
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];
    hours < 10 ? (hours = 0 + hours) : (hours = hours);
    minutes < 10 ? (minutes = 0 + minutes) : (minutes = minutes);
    var time = hours + ':' + minutes;
    return time;
  }

  function listItemView(item) {
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: '#f2fbff',
          paddingTop: 45,
          paddingBottom:45,
          paddingLeft:25,
          flexDirection: 'row',
          borderColor: '#808080',
          borderTopWidth: 0.4,
        }}>
        <Text style={styles.time}>
          {timeAddZero(item.time)}
        </Text>
        <Switch
          style={styles.isEnabled}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={() =>
            toggleSwitch(JSON.parse(item.isEnabled.toLowerCase()), item.id)
          }
          value={JSON.parse(item.isEnabled.toLowerCase())}
        />
      </View>
    );
  }


  const renderHiddenItem = (item,rowMap,index) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        // onPress={() => deleteRow(rowMap, data.item.key)}
        onPress={() => {
          {
            rowMap[index].closeRow()
            deleteAlarm(item.id)
            listAlarms()
          }
         
        }}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={true}
      />
      <TouchableOpacity onPress={showDatePicker} style={styles.image}>
        <IconMaterialIcons
          name="add"
          type="MaterialIcons"
          size={40}
          color="#F5FCFF"
        />
      </TouchableOpacity>
      <SwipeListView
        data={flatListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
        renderHiddenItem={({item,index},rowMap)=>renderHiddenItem(item,rowMap,index)}
        rightOpenValue={-75}
        disableRightSwipe
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  image: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#C0C0C0',
    borderRadius: 25,
    marginTop: 40,
    marginBottom: 40,
  },
  time: {
    fontSize: 26,
    color: '#666666',
    marginRight: '60%',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default AlarmClock;
