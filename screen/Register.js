import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useEffect } from 'react';
// import useFormValidation from "../Auth/useFormValidation";
// import validateLogin from "../Auth/validateLogin";
import firebase from "../firebase/firebase";
// import Drawer from '../screen/Drawer';
// import ForgetPassword from '../screen/ForgetPassword';
import { useSelector, useDispatch } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { editUser } from '../store/actions'
import { Icon, Header, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
// import DropdownAlert from 'react-native-dropdownalert';
// import KeyboardListener from 'react-native-keyboard-listener';
// import AwesomeAlert from 'react-native-awesome-alerts';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button } from 'react-native-paper';
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
    const dispatch = useDispatch()

    async function savedate(user1) {
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




            if (fname == null || fname.trim() == "") {
                setIsname(false);
                setLoginload(true);
            }
            else if (lname == null || lname.trim() == "") {
                setIslname(false)
                setLoginload(true);
            } else if (email == null || email.trim() == "") {
                setIsemail(false)
                setLoginload(true);
            } else if (password == null || password.trim() == "") {
                setIspwd(false)
                setLoginload(true);
            }
            else if (password.length < 6) {
                alert("Minimum password length: 6")
                setIspwd(false)
                setLoginload(true);
            }
            else if (phone == null || phone.trim() == "") {
                setIsphone(false)
                setLoginload(true);
            }
            else if (country == null || country.trim() == "") {
                setIscont(false)
                setLoginload(true);
            }





            else {

                setIsSign(false)
                const user1 = await firebase.register(name, email.trim(), password);
                const newLink = {
                    uid: user1.user.uid,
                    email: email,
                    fname: fname,
                    lname: lname,
                    country: country,

                    phone: phone,


                    role: role,
                    SignUpStep: [],
                };
                const user12 = firebase.db.collection("users").add(newLink);
                user1.user.sendEmailVerification();
                Alert.alert("Signed Up! Check Your Inbox to Confirm Your Email!")
                setLogin(false)

                setLoginload(true);
                setFirebaseError("");
              
                setFname(null);
                setLname(null);
                setPhone(null);
                setCity(null);
                setProvince(null);
                setPostal(null);
                setAi(null);
                setUniCollname(null)



                setCountry(null);
                setLoginload(true);
               
                navigation.navigate("Login");
                setIsSign(true)
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
        <>

  <View style={{ backgroundColor: '#6D0BD4', flex: 1 }}>
 <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
            <ScrollView>
              
                <View style={{
                    justifyContent: 'center',
                            flexDirection: Platform.OS == "ios" ? "column-reverse" : 'row',
                    bottom: 0,
                    marginTop: '16%'


                }}>
                        <ElementButton type="clear"  titleStyle={{ color: '#fff' }}  style={{
                    }} onPress={() => navigation.navigate("ForgetPassword")} title="Forget Password" />


                    <Text style={{ opacity: 0 }}>  |  </Text>

                        <ElementButton type="clear" titleStyle={{ color: '#fff' }} style={{
                            alignItems: 'center',
                            textAlign: 'center',
                    }} onPress={() => navigation.navigate("Login")} title="Login" />
                      
                </View>
                <View style={{ padding: '7%', flex: 1, alignItems: 'center', marginTop: '0%' }}>
                        <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'white' }}>Create Account</Text>
                        <Text style={{ marginTop: '4%', fontSize:hp('2%'), marginBottom: '10%', color: 'white' }}>Please Register or Login to continue</Text>
                       

                    <TextInput mode="flat" dense="false" label="First Name" value={fname} onChangeText={(text) => { setFname(text); setIsname(true) }} style={{ backgroundColor: '#f2f2f2', padding: '0%', width: '100%', marginBottom: isname ? '10%' : '0%' }} />
                    <Text style={{ marginBottom: isname ? '0%' : '10%', color: 'red', display: isname ? 'none' : 'flex' }}>Please enter your first name.</Text>
                     
                    <TextInput mode="flat" dense="false" label="Last Name" leftIcon={<></>} value={lname} onChangeText={(text) => { setLname(text); setIslname(true) }} style={{ backgroundColor: '#f2f2f2', padding: '0%', width: '100%', marginBottom: islname ? '10%' : '0%' }} />
                     
                     
                    <Text style={{ marginBottom: islname ? '0%' : '10%', color: 'red', display: islname ? 'none' : 'flex' }}>Please enter your last name.</Text>
                     

                    <TextInput mode="flat" dense="false" label="Email" textContentType="emailAddress" onChangeText={(text) => { setEmail(text); setIsemail(true) }} style={{ backgroundColor: '#f2f2f2', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: isemail ? '10%' : '0%' }} />
                    
                    <Text style={{ marginBottom: isemail ? '0%' : '10%', color: 'red', display: isemail ? 'none' : 'flex' }}>Please enter your valid email.</Text>
                  
                    <TextInput dense="false" label="Password" mode="flat" secureTextEntry={true} onChangeText={(text) => { setPassword(text); setIspwd(true) }} style={{ backgroundColor: '#f2f2f2', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ispwd ? '10%' : '0%' }} />
                    
                    <Text style={{ marginBottom: ispwd ? '0%' : '10%', color: 'red', display: ispwd ? 'none' : 'flex' }}>Please enter valid password.</Text> 
                 
                    <TextInput dense="true" label="Phone Number" mode="flat" leftIcon={<></>} leftIcon={<></>} keyboardType='numeric' textContentType="telephoneNumber" value={phone} onChangeText={(text) => { setPhone(text); setIsphone(true) }} style={{ backgroundColor: '#f2f2f2', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: isphone ? '10%' : '0%' }} />
                    
                    <Text style={{ marginBottom: isphone ? '0%' : '10%', marginBottom: '2%', color: 'red', display: isphone ? 'none' : 'flex' }}>Please enter your phone number.</Text>
                     
                    <TextInput dense label="Country" mode="flat" leftIcon={<></>} textContentType="countryName" value={country} onChangeText={(text) => { setCountry(text); setIscont(true) }} style={{ backgroundColor: '#f2f2f2', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: iscont ? '10%' : '0%' }} />
                    
                    <Text style={{ marginBottom: iscont ? '0%' : '10%', marginBottom: '2%', color: 'red', display: iscont ? 'none' : 'flex' }}>Please enter your country.</Text>
                    <View style={{ display: "none" }} >
                        <RadioForm
                            labelStyle={{ margin: '2%' }}

                            formHorizontal={true}
                            animation={true}
                            style={{



                                marginTop: '3%',
                                marginBottom: '3%',



                            }}
                            radio_props={radio_props}
                            initial={0}
                            onPress={(value) => { setRole(value) }}
                        />
                            </View>
                       
                        {!isSign ?
                            <Button mode="clear" loading color="white" 
                    >.. </Button>
                    :
                            <Button color="white" mode="contained" buttonStyle={{ width: '100%' }} onPress={authenticateUser}>Signup</Button>}
                </View>
                

               
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        </>
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
    newcont: { height: '100%', justifyContent: 'space-between', flex: 1 }


});
