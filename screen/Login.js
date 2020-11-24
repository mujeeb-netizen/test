import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useEffect } from 'react';

import firebase from "../firebase/firebase";
import Drawer from '../screen/Drawer';
// import ForgetPassword from '../screen/ForgetPassword';
import { useSelector, useDispatch } from 'react-redux' 
// import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { editUser } from '../store/actions'
import { Icon, Header, ListItem, Card, CardItem, Button as ElementButton, Divider } from 'react-native-elements'
// import DropdownAlert from 'react-native-dropdownalert';
// import KeyboardListener from 'react-native-keyboard-listener';
// import AwesomeAlert from 'react-native-awesome-alerts';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Login({ navigation }) {
    const [login, setLogin] = React.useState(false);
  
     
     
    var radio_props = [
        { label: 'Admin', value: 0 },
        { label: 'User', value: 1 }
    ];
    var radio_props2 = [
        { label: 'College', value: 0 },
        { label: 'University', value: 1 }
    ];

    function changestate() {
        setLogin(true)
    }
    const dispatch=useDispatch()
    
    async function savedate(user1)
      {
      await AsyncStorage.setItem('userId', JSON.stringify(user1.user.uid));
      }
    
    const [isname, setIsname] = React.useState(true);
    const [islname, setIslname] = React.useState(true);
    const [iscont, setIscont] = React.useState(true);
    const [isphone, setIsphone] = React.useState(true);
    const [iscity, setIscity] = React.useState(true);
    const [isprovince, setIsprovince] = React.useState(true);
    const [ispostal, setIspostal] = React.useState(true);
    const [isai, setIsai] = React.useState(true);
    const [isunicallname, setIsunicollname] = React.useState(true);
    const [ispwd, setIspwd] = React.useState(true);
    const [isemail, setIsemail] = React.useState(true);
    const [showAlert, setShowalert] = React.useState(false);
    const [alertTitle, setAlerttitle] = React.useState(false);
    const [alertMessage, setAlertmessage] = React.useState(false);
    const [isSign, setIsSign] = React.useState(true);
    const [forget, setForget] = React.useState(false);
    const [firebaseError, setFirebaseError] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [role, setRole] = React.useState(1);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [province, setProvince] = React.useState(null);
    const [postal, setPostal] = React.useState(null);
    const [ai, setAi] = React.useState(null);
    const [unicoll, setunicoll] = React.useState(null);
    const [unicollname, setUniCollname] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(null);
    const [loginload, setLoginload] = React.useState(true);
    var user1;
    console.log('at login')



    async function authenticateUser() {
        setLoginload(false);
      let name = fname;
        try {
           
                if (!login) {
                   
                    try {
                        if (email == null || email.trim() == "") {
                            setIsemail(false)
                            setLoginload(true);
                        }
                        else if (password == null || password == "") {
                            setIspwd(false)
                            setLoginload(true);
                        }
                        else if (password.length < 6) {
                            alert("Minimum password length: 6")
                            setIspwd(false)
                            setLoginload(true);
                        }
                        else {
                            user1 = await firebase.login(email.trim(), password)

                                .catch(error => {

                                    if (error.code == "auth/argument-error") {
                                        Alert.alert("Please enter your credentials")
                                    }
                                    else if (error.code == "auth/invalid-email") {
                                        Alert.alert("Invalid Email")
                                    }
                                    else if (error.code == "auth/user-not-found") {
                                        Alert.alert("User Not Found.")
                                    } else if (error.code == "auth/wrong-password") {
                                        Alert.alert("Password Incorrect.")
                                    }

                                })
                            setLoginload(true);
                        }
                    } catch (err) {
                        alert("Error : ", err);
                        setLoginload(true);
                    }


                    if (user1 != null) {

                        if (email.trim() != "admin@theflipapp.ca" && email.trim() != "Admin@theflipapp.ca") {


                            if (user1.user.emailVerified === false) {
                                Alert.alert(
                                    'Email Not Verified',
                                    'Send Verification Link',
                                    [
                                        { text: 'Cancel', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                        { text: 'Send', onPress: () => { user1.user.sendEmailVerification(); Alert.alert("Email Sent."); setLoginload(true); } },
                                    ]
                                );

                                setLoginload(true);

                            }
                            else {

                                console.log(user1)
                                let userId;
                                savedate(user1);

                                firebase.db.collection('users').where("uid", "==", user1.user.uid)
                                    .get()
                                    .then(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                          
                                            if (typeof doc.data().SignUpStep.address == "undefined") {
                                            
                                                AsyncStorage.setItem('IsRC', JSON.stringify(null));
                                                AsyncStorage.setItem('GPA', JSON.stringify(null));
                                                AsyncStorage.setItem('address', JSON.stringify(null));
                                                AsyncStorage.setItem('ahi', JSON.stringify(null))
                                                AsyncStorage.setItem('pos', JSON.stringify(null))

                                                AsyncStorage.setItem('city', JSON.stringify(null))

                                                AsyncStorage.setItem('eth', JSON.stringify(null))

                                                AsyncStorage.setItem('gender', JSON.stringify(null))

                                                AsyncStorage.setItem('state', JSON.stringify(null))

                                                AsyncStorage.setItem('zip', JSON.stringify(null))
                                                AsyncStorage.setItem('cun', JSON.stringify(null))


                                                AsyncStorage.setItem('cu', JSON.stringify(null))

                                            }
                                            else
                                            { 
                                               

                                            AsyncStorage.setItem('IsRC', JSON.stringify(doc.data().SignUpStep.address));
                                            AsyncStorage.setItem('GPA', JSON.stringify(doc.data().SignUpStep.GPA));

                                            AsyncStorage.setItem('address', JSON.stringify(doc.data().SignUpStep.address))
                                            AsyncStorage.setItem('pos', JSON.stringify(doc.data().SignUpStep.field_of_study))

                                            AsyncStorage.setItem('ahi', JSON.stringify(doc.data().SignUpStep.ahi))

                                            AsyncStorage.setItem('city', JSON.stringify(doc.data().SignUpStep.city))

                                            AsyncStorage.setItem('eth', JSON.stringify(doc.data().SignUpStep.eth))

                                            AsyncStorage.setItem('gender', JSON.stringify(doc.data().SignUpStep.gender))

                                                AsyncStorage.setItem('state', JSON.stringify(doc.data().SignUpStep.state))
                                                AsyncStorage.setItem('zip', JSON.stringify(doc.data().SignUpStep.zip))
                                            AsyncStorage.setItem('cun', JSON.stringify(doc.data().SignUpStep.educational_institution_name))

                                            var colluni = doc.data().SignUpStep.educational_institution
                                            if (colluni == 1 || colluni == "1") {
                                                AsyncStorage.setItem('cu', JSON.stringify("University"))
                                            } else {
                                                AsyncStorage.setItem('cu', JSON.stringify("College"))
                                            }
                                        }

                                            
                                            AsyncStorage.setItem('docid', JSON.stringify(doc.id));
                                            AsyncStorage.setItem('email', JSON.stringify(doc.data().email));
                                            AsyncStorage.setItem('role', JSON.stringify(doc.data().role));
                                            AsyncStorage.setItem('country', JSON.stringify(doc.data().country));
                                            AsyncStorage.setItem('fname', JSON.stringify(doc.data().fname));
                                            AsyncStorage.setItem('lname', JSON.stringify(doc.data().lname));                                       
                                            AsyncStorage.setItem('phone', JSON.stringify(doc.data().phone))

                                            if (typeof doc.data().SignUpStep.address == "undefined") {
                                              
                                                dispatch(editUser({ lname: JSON.stringify(doc.data().lname), fname: JSON.stringify(doc.data().fname), country: JSON.stringify(doc.data().country), cu: JSON.stringify(null), cun: JSON.stringify(null), phone: JSON.stringify(doc.data().phone), zip: JSON.stringify(null), state: JSON.stringify(null), gender: JSON.stringify(null), eth: JSON.stringify(null), city: JSON.stringify(null), ahi: JSON.stringify(null), address: JSON.stringify(null), role: JSON.stringify(doc.data().role), email: JSON.stringify(doc.data().email), docid: doc.id, uid: user1.user.uid, isrc: JSON.stringify(null), gpa: JSON.stringify(null), pos: JSON.stringify(null) }))
                                                console.log('seting value');
                                            }
                                            else {
                                                dispatch(editUser({ lname: JSON.stringify(doc.data().lname), fname: JSON.stringify(doc.data().fname), country: JSON.stringify(doc.data().country), cu: JSON.stringify(doc.data().SignUpStep.educational_institution), cun: JSON.stringify(doc.data().SignUpStep.educational_institution_name), phone: JSON.stringify(doc.data().phone), zip: JSON.stringify(doc.data().SignUpStep.zip), state: JSON.stringify(doc.data().SignUpStep.state), gender: JSON.stringify(doc.data().SignUpStep.gender), eth: JSON.stringify(doc.data().SignUpStep.eth), city: JSON.stringify(doc.data().SignUpStep.city), ahi: JSON.stringify(doc.data().SignUpStep.ahi), pos: JSON.stringify(doc.data().SignUpStep.field_of_study), address: JSON.stringify(doc.data().SignUpStep.address), role: JSON.stringify(doc.data().role), email: JSON.stringify(doc.data().email), docid: doc.id, uid: user1.user.uid, isrc: JSON.stringify(doc.data().SignUpStep.address), gpa: JSON.stringify(doc.data().SignUpStep.GPA) }))
                                            console.log('seting value');
                                            }
                                           
                                        });
                                    })
                                    .catch(function (error) {
                                        console.log("Error getting documents: ", error);
                                    });
                                dispatch(editUser({ role: JSON.stringify(doc.data().role), email: JSON.stringify(doc.data().email), uid: user1.user.uid, isrc: JSON.stringify(null) }))

                            }
                        }
                        else {

                            console.log(user1)
                            let userId;
                            savedate(user1);

                            firebase.db.collection('users').where("uid", "==", user1.user.uid)
                                .get()
                                .then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc) {
                                         
                                        AsyncStorage.setItem('docid', JSON.stringify(doc.id));
                                        AsyncStorage.setItem('email', JSON.stringify(doc.data().email));
                                        AsyncStorage.setItem('role', JSON.stringify(doc.data().role));
                                        
                                        dispatch(editUser({ role: JSON.stringify(doc.data().role), email: JSON.stringify(doc.data().email), docid: doc.id, uid: user1.user.uid }))
                                        console.log('seting value');
                                    });
                                })
                                .catch(function (error) {
                                    console.log("Error getting documents: ", error);
                                });
                            dispatch(editUser({ role: JSON.stringify(doc.data().role), uid: user1.user.uid }))

                        }
                    }
                }
                
                
          }
        catch (err) {  
            setIsSign(true)
            if (err.code == "auth/email-already-in-use") {
                Alert.alert("Email already in use.")
            }
            else if (err.code == "auth/invalid-email") {
                Alert.alert("Invalid Email")
            }
            else {
               
            }
            setLoginload(true);
        }
         
   }
    return (
        <View style={{ backgroundColor: '#6D0BD4', flex:1 }}>
           <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
            <ScrollView>
            <View style={{
                        justifyContent: 'center',
                        flexDirection: Platform.OS == "ios" ? "column-reverse" : 'row',
               
                  marginTop: '12%' 
                }}>
                    <ElementButton type="clear" titleStyle={{ color: '#fff' }}  style={{
                  }} onPress={() => navigation.navigate("ForgetPassword")} title="Forget Password" />


                  <Text style={{ opacity: 0 }}>  |  </Text>

                    <ElementButton type="clear" titleStyle={{ color: '#fff' }}  onPress={() => { navigation.navigate("Register"); }} style={{
                          alignItems: 'center',
                          textAlign: 'center'

                      }} title="Create Account" />

                     
                </View> 
                <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Image
                        style={{
                            marginTop:'25%',
                            width: wp('100%'),
                            height: hp('16%'),
                            resizeMode: 'stretch',}}
                        source={require('../logo.png')}
                    />
                </View>
                <View style={{marginTop:'5%', alignItems: 'center' }}>
                    <Divider style={{ width: '80%' }} />
                </View>
               
                    <View style={{ padding: '7%', flex: 1, alignItems: 'center', marginTop: '0%' }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: '600', color: 'white' }}> Login  </Text>
                    <Text style={{ marginTop: '4%', marginBottom: '10%', color: 'white', fontSize: hp('2%') }}>Please Register or Login to continue</Text>

                        <TextInput mode="flat" dense="false" label="Email" textContentType="emailAddress" onChangeText={(text) => { setEmail(text); setIsemail(true) }} style={{ backgroundColor: '#f2f2f2', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: isemail ? '10%' : '0%' }} />
                        <Text style={{ marginBottom: isemail ? '0%' : '10%', color: 'red', display: isemail ? 'none' : 'flex' }}>Please enter your valid email.</Text> 


                  <TextInput dense="false" label="Password" mode="flat" secureTextEntry={true} onChangeText={(text) => { setPassword(text); setIspwd(true) }} style={{ backgroundColor: '#f2f2f2', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ispwd ? '10%' : '0%' }} />
                  <Text style={{ marginBottom: ispwd ? '0%' : '10%', color: 'red', display: ispwd ? 'none' : 'flex' }}>Please enter valid password.</Text> 

                   
                           
                               
                  {!login ?
                        loginload ?
                            <Button mode="contained" color="white"  onPress={authenticateUser} style={{

                          }} >Login</Button> :
                            <Button loading color="white"
                          > LOADING</Button>:<></>}
                  </View>
             
                 
         
             
          </ScrollView>
   </KeyboardAvoidingView>
        </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


    positionInBottom: {
        position: 'absolute',

        alignItems: 'center',
        textAlign: 'center',
        bottom: 10,

    },
    newcont:{ height: '100%', justifyContent: 'space-between', flex: 1 }


});
