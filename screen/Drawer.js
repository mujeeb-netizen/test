import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,ScrollView } from 'react-native';
 
import { Icon } from 'react-native-elements'
 

export default function Drawer() {
  const [drawer, setDrawer] = React.useState(false);
  return (
  <>
  {drawer? <></> : <><View style={{alignItems:'flex-start'}}><Icon style={{marginRight:'50'}} onPress={() => setDrawer(true)} name='list'/></View>
    
   </>}
      <View style={{opacity:drawer ? 1 : 0 ,backgroundColor:'white' ,width: '50%',height: drawer ? '100%' : '0%'  }}><Icon  onPress={() => setDrawer(false)} name='list'/></View>
 
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 