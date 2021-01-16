import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,Switch } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

function LedAutoBrightness() {
  const [isEnabled, setIsEnabled] = useState(false);

  function sendData(value){
    BluetoothSerial.write(value)
}

  useEffect(() => {
    sendData("o)")
    setTimeout(function()
    {
        BluetoothSerial.readFromDevice().then((data) => {
            if (data==0)
            {
              setIsEnabled(false);
            }
            if (data==1)
            {
              setIsEnabled(true);
            }
        });
    }, 300);

}, []);


  function toggleSwitch  () {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled)
    {
      sendData("l)")
    }
    else if (isEnabled)
    {
      sendData("n)")
    }
  } 

    return (
      <View style={styles.container}>
        <Text style={styles.autoText}>Otamatik Parlaklık:</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  autoText:{
    fontSize:20,
    marginRight:10,
    color: "#8D8B8B"
  }

})

export default LedAutoBrightness;
