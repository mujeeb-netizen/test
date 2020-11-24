import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Alert, Image,TouchableOpacity, Picker } from 'react-native';
import {  Header, Button, Card ,Icon} from 'react-native-elements'
import { useEffect } from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateLogin from "../Auth/validateLogin";

import firebase from "../firebase/firebase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Award from './Award';

import {useSelector,useDispatch} from 'react-redux' 

import { editUser } from '../store/actions'
 

import RadioForm from 'react-native-simple-radio-button';
import { TextInput, Button as NewBtn, Divider } from 'react-native-paper';

import AwardList from './AwardList';
 

export default function Home({ navigation }) {
    var radio_props2 = [
        { label: 'College', value: 0 },
        { label: 'University', value: 1 }
    ];

    
    var [mainload, setMainload] = React.useState(false);
    var [genders, setGenders] = React.useState([]);
    var [FOSs, setFOSs] = React.useState([]);
    
    useEffect(() => {
        if (uid != null ) {

        
            getGenderListFromFirebase();
            getFOSFromFirebase();
        }
        setTimeout(() => {
            setMainload(true)
        }, 2000)
         

    }, []);
    async function getGenderListFromFirebase() {
     
            await firebase.db.collection("gender").onSnapshot(handleSnapshot_);
    }
    async function getFOSFromFirebase() {
     
            await firebase.db.collection("field_of_study").onSnapshot(handleSnapshot__);
        }
        function handleSnapshot_(snapshot) {
            debugger
            const links = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            setGenders(links);
    }
    function handleSnapshot__(snapshot) {
            debugger
            const links = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            setFOSs(links);
        }
    const dispatch = useDispatch()
    const [element, setElement] = React.useState(false);
    const [mygpa1, setMygpa1] = React.useState(false);

    AsyncStorage.getItem('docid')
        .then(results1 => {
            if (results1 === null) {

                
                setElement(results1)
               

            }
            else {
                
               
                setElement(results1)
        

            }
        })


  

    const CreateTabs = createBottomTabNavigator()
    // const [isrc, setIsrc] = React.useState(null);
    // const [uid, setUid] = React.useState(null);
    var [address, setAddress] = React.useState(null);
    var [city, setCity] = React.useState(null);
    var [state, setState] = React.useState(null);
    var [gender, setGender] = React.useState("Male");
 
    var [eth, setEth] = React.useState(null);
    var [zip, setZip] = React.useState(null);
    var [aHI, setAHI] = React.useState(null);
    var [gPA, setGPA] = React.useState(null);
    var [phone, setPhone] = React.useState(null);
    var [fos, setFos] = React.useState(null);
    var [unicollname, setUniCollname] = React.useState(null);
    var [unicoll, setunicoll] = React.useState(null);
    var [collage1, setCollage1] = React.useState(null);
    var [collage2, setCollage2] = React.useState(null);
    var [collage3, setCollage3] = React.useState(null);
    var [IsLoading, setIsLoading] = React.useState(true)
    var [isload1, setIsLoad1] = React.useState(true)
 
    const uid = useSelector(state=>state.uid)
    const isrc = useSelector(state => state.isrc)
    const docid = useSelector(state => state.docid)
    const role = useSelector(state => state.role)
    const fname1 = useSelector(state => state.fname)
    const email1 = useSelector(state => state.email)
    const lname1 = useSelector(state => state.lname)
    const country1 = useSelector(state => state.country)
    const phone1 = useSelector(state => state.phone)
 
    var user =null; 
    
    //alert("uid>>" + uid)
    //alert("isrc>>" + isrc)
    //alert("docid>>" + docid)
    //alert( "role>>"+role )
    function CompleteRegistration_() {
        debugger
        try {
            if (uid != null || uid != "null") {

                if (uid) {
                    if (address == null || address == "") {
                        Alert.alert("Enter Address.");
                    } else if (city == null || city == "") {
                        Alert.alert("Enter city.");
                    }
                    else if (state == null || state == "") {
                        Alert.alert("Enter Province.");
                    }  else if (zip == null || zip == "") {
                        Alert.alert("Enter Postal code.");
                    } else if (gender == null || gender == "") {
                        Alert.alert("Select gender.");
                    } else if (eth == null || eth == "") {
                        Alert.alert("Enter ethincity");
                    }
                    else if (aHI == null || aHI == "") {
                        Alert.alert("Enter annual income.");
                    }else if (gPA == null || gPA == "") { 
                        Alert.alert("Enter GPA.");
                    }
                    else if (parseFloat(gPA) > parseFloat(4)) {
                        Alert.alert(" GPA range 1-4");
                    }
                    else if (fos == null || fos == "") {
                        Alert.alert("Select Field of study.");
                    }
                    else if (unicollname == null || unicollname == "") {
                        Alert.alert("Enter collage/university.");
                    }  
                    
                    else {
                        setIsLoad1(true)
                        const voteRef = firebase.db.collection("users").doc(docid);
                        voteRef.get().then(doc => {
                            if (doc.exists) {
                                const SignUpStep = { address: address, state: state, city: city, zip: zip, gender: gender, eth: eth, ahi: aHI, educational_institution: unicoll, educational_institution_name: unicollname, GPA: gPA,field_of_study:fos };

                                return voteRef.update({ SignUpStep: SignUpStep });
                            }
                        }).then(function () {
                            AsyncStorage.setItem('IsRC', JSON.stringify(address));
                            AsyncStorage.setItem('GPA', JSON.stringify(gPA));
                            AsyncStorage.setItem('city', JSON.stringify(city));
                            AsyncStorage.setItem('address', JSON.stringify(address));
                            AsyncStorage.setItem('country', country1);
                            AsyncStorage.setItem('pos', JSON.stringify(fos) );
                            AsyncStorage.setItem('phone', phone1);
                            AsyncStorage.setItem('zip', JSON.stringify(zip));
                            AsyncStorage.setItem('gender', JSON.stringify(gender));
                            AsyncStorage.setItem('eth', JSON.stringify(eth));
                            AsyncStorage.setItem('ahi', JSON.stringify(aHI));
                            AsyncStorage.setItem('cu', JSON.stringify(unicoll));
                            AsyncStorage.setItem('cun', JSON.stringify(unicollname));
                            AsyncStorage.setItem('state', JSON.stringify(state));
                            AsyncStorage.setItem('email', JSON.stringify(email));
                            AsyncStorage.setItem('docid', JSON.stringify(docid));
                            AsyncStorage.setItem('uid', JSON.stringify(uid));
                            AsyncStorage.setItem('fname', fname1);
                            AsyncStorage.setItem('lname', lname1);
                            AsyncStorage.setItem('email', email1);
                            AsyncStorage.setItem('role', role);
                            dispatch(editUser({ phone: phone1, country: country1, uid: uid, fname: fname1, lname: lname1, city: JSON.stringify(city), pos: JSON.stringify(fos), address: JSON.stringify(address), zip: JSON.stringify(zip), gender: JSON.stringify(gender), eth: JSON.stringify(eth), ahi: JSON.stringify(aHI), cu: JSON.stringify(unicoll), cun: JSON.stringify(unicollname), state: JSON.stringify(state), docid: docid, email: email1, gpa: JSON.stringify(gPA), role: role, uid: uid, isrc: JSON.stringify(address) }))

                        });
                        setIsLoad1(false)
                    }
                }
            }
        }
        catch (err) {
            setIsLoad1(false)
            Alert.alert(err);
            setFirebaseError(err.message);
        }
        finally {
            //const history = createHashHistory();
            //history.go("/login");
        }
    }
    function authenticateUser() {
    }
    const {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        isSubmitting
    } = useFormValidation(validateLogin, authenticateUser);

    const [firebaseError, setFirebaseError] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(null);
    const [login, setLogin] = React.useState(false);
    
    console.log('at home')
    console.log('Home uid-> ', uid)
    if (!mainload) {
        return ( 

            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button
                    
                title="Loading"
                type="clear"
                loading
                />
            </View>
            
            );
    }
    else {
        if (uid === null || uid == "null" || typeof uid == "undefined" ) { 
 
        return (
           
              
                <View style={styles2.container}  >
                    
                    <View style={{ position: 'absolute', top: 0, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                            style={{
                                 marginTop: '25%',
                                width: 500,
                                height: 150,
                                resizeMode: 'stretch',
                            }} 
                                source={require('../logo.png')}
                            />
                            <Text style={{ marginTop:'0%', color: 'white', fontSize: 40 }}>  FLIP  </Text>
                        </View>
                    </View> 
                    {!uid ? 
                        <View style={styles2.loginForm} >

                        <Button type="outline" titleStyle={{ color: '#6D0BD4' }} buttonStyle={{ backgroundColor: 'white', width: '100%', borderWidth: 1, borderColor: 'white' }} style={{ marginBottom:'5%', opacity: IsLoading ? 0 : 1 }} onPress={() => (navigation.navigate("Login", {
                                reg: 'no'
                        }))} style={{ width: "100%" }} title="Login" />
                        <Divider />
                        <Button titleStyle={{ color: '#fff' }} type="clear" buttonStyle={{ width: '100%', }} style={{ marginTop: '5%', textAlign: 'center', color: 'white' }} onPress={() => (navigation.navigate("Register"))} title="Do not have an account?" />
   </View>
                            : <></>}
                </View>
           
      
        );
    
    }
    else
     
        {
            if (role === "0" || role === 0) {
                return (
                    <>

                        <Header backgroundColor="#6D0BD4"
                            leftComponent={
                                <TouchableOpacity onPress={() => (navigation.openDrawer())}>
                                    <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./menu.png')} />

                                </TouchableOpacity>
                            }
                            centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
                        />
                        <CreateTabs.Navigator tabBarOptions={{
                            activeTintColor: '#6D0BD4',
                        }}  >
                         
                            

                            <CreateTabs.Screen labelStyle={{ color: '#6D0BD4' }} name="Add Awards" component={AwardList}
                                
                                options={{
                               
                                tabBarLabel: 'Add Award',
                                tabBarLabelcolor: '#6D0BD4',
                                
                                tabBarIcon: () => (
                                    
               
                    <Image style={{ width: 25, height: 25}} source={require('./star.png')} />

             
            
                               ),
                            }} />
                          
                        </CreateTabs.Navigator>
                    </>
                )
            }

            else {
                if (isrc == "null" || isrc == null || typeof isrc == "undefined") {
                return (


                    <>
                        <Header backgroundColor="#6D0BD4"
                            leftComponent={
                                <TouchableOpacity onPress={() => (navigation.openDrawer())}>
                                    <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./menu.png')} />

                                </TouchableOpacity>
                            }
                            centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
                        />
                        <ScrollView>
                            <Card title="Complete Sign Up">  
                                <View style={{   padding: '5%', borderRadius: 30, marginTop: '0%' }}>
                                   

                                    <TextInput dense label="Address" onChangeText={(text) => setAddress(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />
                                    <TextInput dense label="City" onChangeText={(text) => setCity(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />
                                    <TextInput dense label="Province/Territory" onChangeText={(text) => setState(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />
                                    <TextInput dense label="Postal Code" onChangeText={(text) => setZip(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />
                                    <Text style={{ alignItems: 'flex-start', marginLeft:'3%' }}>Gender</Text>
                                    <Picker

                                        style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom:'2%' }}
                                        selectedValue={gender}

                                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                                    >
                                         
                                        {
                                            genders.map(links => (


                                            <Picker.Item label={links.typename} value={links.typename} />
 

                                        ))}
                                       
                                         
                                    </Picker>
                                   

                                    <TextInput dense label="Ethinicity" onChangeText={(text) => setEth(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />
                                    <TextInput dense label="Annual Income" keyboardType='numeric' onChangeText={(text) => setAHI(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />
                                    <TextInput dense label="GPA" keyboardType='numeric' onChangeText={(text) => setGPA(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />
                                    <Text style={{ alignItems: 'flex-start', marginLeft: '3%' }}>Field of study</Text>
                                    <Picker

                                        style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom: '2%' }}
                                        selectedValue={fos}

                                        onValueChange={(itemValue, itemIndex) => setFos(itemValue)}
                                    >
                                        <Picker.Item label="--Select here--" value="" />
                                        {
                                            FOSs.map(links => (


                                                <Picker.Item label={links.type_name} value={links.type_name} />


                                            ))}


                                    </Picker>
                                    <View style={{ alignItems:'center', display: "flex" }} >
                                        <RadioForm
                                            buttonColor={'#6D0BD4'} 
                                            selectedButtonColor={'#6D0BD4'} 
                                            labelStyle={{ margin: '2%' }}
                                            style={{ color: 'red' }}
                                            backgroundColor='red'
                                            formHorizontal={true}
                                            animation={true}
                                            style={{



                                                marginTop: '3%',
                                                marginBottom: '3%',



                                            }}
                                            radio_props={radio_props2}
                                            initial={0}
                                            onPress={(value) => { setunicoll(value) }}
                                        />
                                    </View>
                                    <TextInput dense label=" College/University" textContentType="organizationName" value={unicollname} onChangeText={(text) => { setUniCollname(text); }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />

                                    {isload1 ? <Button onPress={CompleteRegistration_} buttonStyle={{ backgroundColor: '#6D0BD4' }} title="Save" /> : <Button loadingStyle={{ color: '#6D0BD4' }} type="clear" loading style={{}} title="" />}

                                </View>
                            
                            </Card>
                        </ScrollView>

                    </>
                );
            }
            else {

                return (
                    <>

                        <Header backgroundColor="#6D0BD4"
                            leftComponent={
                                <TouchableOpacity onPress={() => (navigation.openDrawer())}>
                                    <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./menu.png')} />

                                </TouchableOpacity>
                            }
                            centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
                        />
                        <CreateTabs.Navigator  >
                           
                            <CreateTabs.Screen name="Award" component={Award} options={{
                                tabBarLabel: 'Awards',
                                tabBarIcon: () => (
                              
             
                    <Image style={{ width: 25, height: 25 }} source={require('./star.png')} />

               
            
                                ),
                            }} />
                        </CreateTabs.Navigator>
                    </>
                )

                }
            }
        }
}
  
}
const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    }
});
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
var styles2 = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#6D0BD4'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch'
     
    },
    loginForm: {
        position: 'absolute',
        justifyContent: 'center',
        
        bottom: 50,
        left: 50,
        right: 50,
        
    },
});