// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App = () => {
//     console.log("waiz")
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, NetInfo, TouchableOpacity,Image } from 'react-native';
import { decode, encode } from 'base-64'
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator, DrawerItems  } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screen/Login';
import ForgetPassword from './screen/ForgetPassword';
import FAQs from './screen/FAQs';
import AddFAQs from './screen/AddFAQs';
import Contact from './screen/Contact';
import Home from './screen/Home';
import Register from './screen/Register';
import LibView from './screen/LibView';
import Logout from './screen/Logout';
import MyProfile from './screen/MyProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Header } from 'react-native-elements'
import FirstHome from './screen/FirstHome';
import {createStore} from 'redux'
import {Provider} from 'react-redux' 
import rootReducer from './store/reducers'
import {useDispatch,useSelector} from 'react-redux'
import {editUser,editISRC} from './store/actions' 
import AddLibContent from './screen/AddLibContent';
import AddAward from './screen/AddAward';
import AddGender from './screen/AddGender';
import AddAwardType from './screen/AddAwardType';
import AddFAQsCategory from './screen/AddFAQsCategory';
import FAQList from './screen/FAQList';
import FAQEditById from './screen/FAQEditById';
import EditAward from './screen/EditAward';
import ApplyAward from './screen/ApplyAward';
import FAQById from './screen/FAQById';
import About from './screen/About';
 
const store = createStore(rootReducer)
const Stack = createStackNavigator();
 
const Tab = createBottomTabNavigator();
 
const MainScreen = () => {
  console.log("HELLO")
  // const [uid, setUid] = useState(null);
    const uid2 = useSelector(state=>state.uid)
    const role2 = useSelector(state=>state.role)
    const fname = useSelector(state=>state.fname)
    const dispatch = useDispatch()
 
    var results61;
    var results11;
    var results31;
    var results51;
    var result455;
    useEffect(() => {  

 
      AsyncStorage.getItem('userId')
      .then(results1 => {
        if (results1 === null) {
          console.log('results ',results1)
        }
        else {
          console.log('result: ',results1)
            AsyncStorage.getItem('docid')
                .then(results3 => {
                    AsyncStorage.getItem('GPA')
                        .then(results5 => {

                            AsyncStorage.getItem('email')
                                .then(results6 => {
                                    AsyncStorage.getItem('role')
                                        .then(results621 => {
                                            AsyncStorage.getItem('IsRC')
                                                .then(results => {
                                                    AsyncStorage.getItem('address')
                                                        .then(results009 => {
                                                            AsyncStorage.getItem('ahi')
                                                                .then(result0009 => {

                                                                    AsyncStorage.getItem('city')
                                                                        .then(result00009 => {
                                                                            AsyncStorage.getItem('eth')
                                                                                .then(result000009 => {
                                                                                    AsyncStorage.getItem('gender')
                                                                                        .then(result0000009 => {
                                                                                            AsyncStorage.getItem('state')
                                                                                                .then(result00000009 => {
                                                                                                    AsyncStorage.getItem('zip')
                                                                                                        .then(result000000009 => {
                                                                                                            AsyncStorage.getItem('phone')
                                                                                                                .then(result0000000009 => {
                                                                                                                    AsyncStorage.getItem('cun')
                                                                                                                        .then(result00000000009 => {
                                                                                                                            AsyncStorage.getItem('cu')
                                                                                                                                .then(result000000000009 => {
                                                                                                                                    AsyncStorage.getItem('country')
                                                                                                                                        .then(result0000000000009 => {
                                                                                                                                            AsyncStorage.getItem('fname')
                                                                                                                                                .then(result00000000000009 => {
                                                                                                                                                    AsyncStorage.getItem('lname')
                                                                                                                                                        .then(result000000000000009 => {
                                                                                                                                                            AsyncStorage.getItem('pos')
                                                                                                                                                                .then(result3000000000000009 => {
                                                                                                                                                                    const data = {
                                                                                                                                                                        uid: results1,
                                                                                                                                                                        isrc: results,
                                                                                                                                                                        email: results6,
                                                                                                                                                                        address: results009,
                                                                                                                                                                        ahi: result0009,
                                                                                                                                                                        city: result00009,
                                                                                                                                                                        eth: result000009,
                                                                                                                                                                        gender: result0000009,
                                                                                                                                                                        state: result00000009,
                                                                                                                                                                        zip: result000000009,
                                                                                                                                                                        phone: result0000000009,
                                                                                                                                                                        cun: result00000000009,
                                                                                                                                                                        cu: result000000000009,
                                                                                                                                                                        country: result0000000000009,
                                                                                                                                                                        fname: result00000000000009,
                                                                                                                                                                        lname: result000000000000009,
                                                                                                                                                                        docid: results3,
                                                                                                                                                                        gpa: results5,
                                                                                                                                                                        role: results621,
                                                                                                                                                                        pos: result3000000000000009
                                                                                                                                                                    }

                                                                                                                                                                    if (results === null) {
                                                                                                                                                                        console.log('IsRc-> ', null)
                                                                                                                                                                        dispatch(editUser(data))
                                                                                                                                                                    }
                                                                                                                                                                    else {
                                                                                                                                                                        console.log('IsRc-> ', results)
                                                                                                                                                                        dispatch(editUser(data))
                                                                                                                                                                    }
                                                                                                                                                                })
                                                                                                                                                        })
                                                                                                                                                })
                                                                                                                                        })
                                                                                                                                })
                                                                                                                        })
                                                                                                                })
                                                                                                        })
                                                                                                })
                                                                                        })
                                                                                })
                                                                        })
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                })
         
         
        
          
           
         
          
           
           
          
           
           
          
           
           
          
        }
      })
      },[])
    
    const Drawer = createDrawerNavigator();
    
    if (!global.btoa) {  global.btoa = encode }
    if (!global.atob) { global.atob = decode }
     
    const myStackNavigator=()=>{
        return (
            <>
               
                <Drawer.Navigator drawerContentOptions={{
                    activeTintColor: '#6D0BD4',
                    itemStyle: { marginVertical: 10 },
                }} headerShown="true" >

                    {uid2 === null || uid2 == "null" || typeof uid2 == "undefined" ?
                  <>
                            <Drawer.Screen activeTintColor="red" style={{backgroundColor:'red'}} name="Home" component={Home} />
                            <Drawer.Screen name="Login" component={Login} />
                            <Drawer.Screen name="Register" component={Register} />
                            
                     
                      <Drawer.Screen name="About FLIP" component={About} />

                  </> :
                  role2 === "0"|| role2 === 0 ? <>

                      <Drawer.Screen name="Home" component={Home} />
                     
                     
                     
                          
                            
                            <Drawer.Screen name="Add Award Type - Setup" component={AddAwardType} />
                            
                            <Drawer.Screen name="Add Awards" component={Home} />
                              
                            <Drawer.Screen name="About FLIP" component={About} />
                      <Drawer.Screen name="Logout" component={Logout} />
                  </>
                      :
              <>
                                <Drawer.Screen name="Home" component={Home} />
                                
                               
                     
                      
                                <Drawer.Screen name="About FLIP" component={About} />
                <Drawer.Screen name="Logout" component={Logout} />
              </>
            }
                </Drawer.Navigator>
                </>
      )
    }
    console.log('App uid-> ',uid2)
    return (

      <>
        <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
            <Stack.Screen name="Flip" component={myStackNavigator}/>
            <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="FAQList" component={FAQList} />
                    <Stack.Screen name="AddFAQs" component={AddFAQs} />
                    <Stack.Screen name="FAQEditById" component={FAQEditById} />
                    <Stack.Screen name="AddAward" component={AddAward} />
                    <Stack.Screen name="EditAward" component={EditAward} />
                    <Stack.Screen name="ApplyAward" component={ApplyAward} />
                    <Stack.Screen name="FAQById" component={FAQById} />
         
          </Stack.Navigator>
        </NavigationContainer>  
                </>
               
    );
  }

export default function App(){
  console.log("Hello")
  return (
    <Provider store={store}> 
      <MainScreen />
    </Provider>
  )
}



  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
