import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useEffect } from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateLogin from "../Auth/validateLogin";
import firebase from "../firebase/firebase";
import Drawer from '../screen/Drawer';
import { useSelector, useDispatch } from 'react-redux'
import { editUser } from '../store/actions'
import { Icon, Header, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { TextInput, Button } from 'react-native-paper';
export default function ForgetPassword({ navigation }) {
    function changestate() {
        setLogin(true)
    }
    const dispatch = useDispatch()
    async function handleResetPassword() {
        if (email != null) {


            try {
                await firebase.resetPassword(email.trim());
                Alert.alert("Email sent. Please check your inbox to change your password.")
                navigation.navigate("Login")
            }
            catch (err) {
                if (err.code == "auth/invalid-email") {
                    Alert.alert("Invalid Email");
                } else if (err.code == "auth/user-not-found") {
                    Alert.alert("User Not Found");
                }

            }
        } else {
            Alert.alert("Please Enter Email.");
        }
    }
    const [login, setLogin] = React.useState(false);
    const [firebaseError, setFirebaseError] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(null);
    const [loginload, setLoginload] = React.useState(true);
    var user1;
    console.log('at login')
  
    return (
        <>
            <View style={{ backgroundColor: '#6D0BD4', flex: 1 }}>
            <ScrollView>
               
                <View style={{
                    justifyContent: 'center',
                        flexDirection: Platform.OS == "ios" ? "column-reverse" : 'row',
                    bottom: 0,
                    marginTop: '15%'


                    }}>
                        <ElementButton type="clear" titleStyle={{ color: '#fff' }} style={{
                    }} onPress={() => navigation.navigate("Register")} title=" Create Account" />


                    <Text style={{ opacity: 0 }}>  |  </Text>

                        <ElementButton type="clear" titleStyle={{ color: '#fff' }} style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }} onPress={() => navigation.navigate("Login")} title="Login" />

                </View>

                    <View style={{ marginLeft: '10%', marginRight: '10%',  alignItems: 'center', marginTop: '40%', flex:1 }}>

                        <Text style={{ fontSize: 20, fontWeight: '300', color: 'white' }}>
                            Forget Password
                  </Text>
                        <Text style={{ marginTop: '9%', color:'white'}}>Please Enter Your Email Address</Text>
                        <Text>{"\n"}</Text>
                        <TextInput dense label="Email" mode="flat" textContentType="emailAddress" onChangeText={(text) => setEmail(text)} style={{ backgroundColor: '#f2f2f2', padding: '0%', width: '100%', marginBottom: '10%' }} />

                        <Button color="white" mode="contained" onPress={handleResetPassword} style={{ marginBottom: '10%' }}   > Reset</Button>

                        
                    </View>
                    
              
        
            </ScrollView>
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
});
