import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, FlatList, Switch, TouchableOpacity, ToastAndroid} from 'react-native';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'

export default class BluetoothConnection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    }
  }
  UNSAFE_componentWillMount(){
 
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
 
      this.setState({ isEnabled, devices })
    })
 
    BluetoothSerial.on('bluetoothEnabled', () => {
 
      Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ])
      .then((values) => {
        const [ isEnabled, devices ] = values
        this.setState({  devices })
      })
 
      BluetoothSerial.on('bluetoothDisabled', () => {
 
         this.setState({ devices: [] })
 
      })
      BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
 
    })
 
  }
  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log(`Connected to device ${device.name}`);
      this.props.navigation.navigate('Led')  
      
      ToastAndroid.show(`Cihaza Bağlanıldı ${device.name}`, ToastAndroid.SHORT);
    })
    .catch((err) => console.log((err.message)))
  }
  _renderItem(item){
 
    return(<TouchableOpacity onPress={() => this.connect(item.item)}>
            <View style={styles.deviceNameWrap}>
              <Text style={styles.deviceName}>{ item.item.name ? item.item.name : item.item.id }</Text>
            </View>
          </TouchableOpacity>)
  }
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
 
  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
 
  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }
  discoverAvailableDevices () {
    
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
        console.log(uniqueDevices);
        this.setState({ unpairedDevices: uniqueDevices, discovering: false })
      })
      .catch((err) => console.log(err.message))
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.toolbar}>
      <Text style={styles.toolbarTitle}>Bluetooth Cihaz Listesi</Text>
      <View style={styles.toolbarButton}>
        <Switch
          value={this.state.isEnabled}
          onValueChange={(val) => this.toggleBluetooth(val)}
        />
      </View>
      </View>
      <Button


      onPress={this.discoverAvailableDevices.bind(this)}
      title="CİHAZLARI TARA"
      color="#1171ba"
     />

    <FlatList
    style={{flex:1}}
    data={this.state.devices}
    keyExtractor={item => item.id}
    renderItem={(item) => this._renderItem(item)}
    />
  </View>   
    );
  }
}



 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
    paddingTop:13,
    paddingBottom:13,
    flexDirection:'row',
    backgroundColor:'#FFFFFF'
  },
  toolbarButton:{
    width: 50,
    marginTop: 4,
  },
  toolbarTitle:{
    textAlign:'center',
    fontSize: 19,
    color:'#656262',
    fontWeight:'bold',
    flex:1,
    marginTop:3
  },
  deviceName: {
    fontSize: 17,
    color: "black"
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth:1
  }
});