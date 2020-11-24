import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker,Image, TouchableOpacity } from 'react-native';

import { Card, Header, ListItem, Button as ElementBtn,Icon } from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import { TextInput, Button, Caption, Divider } from 'react-native-paper';
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
import AddNewItem from './DataRepository/AddNewItem';
import DatePicker from 'react-native-datepicker'
export default function AddAward({navigation: { goBack }  }) {


    var today = new Date();
    var dd =today.getDate()
    var mm = today.getMonth() + 1 
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy; 
    var [date, setDate] = React.useState(today);
   
    var [loading, setLoading] = React.useState(null);
    var [viewlist, setViewlist] = React.useState(false);
    var [isEdit, setIsedit] = React.useState(false);
    var [title, setTitle] = React.useState(null);
    var [desc, setDesc] = React.useState(null);
  
    var [type, setType] = React.useState(null);
  
    var [exdate, setExdate] = React.useState(null);
    var [created, setCreated] = React.useState(null);
    var [gpaf, setGpaf] = React.useState(null);
    var [gpat, setGpat] = React.useState(null);
    var [pos, setpos] = React.useState(null);
    var [voa, setvoa] = React.useState(null);
    var [province, setProvince] = React.useState(null);
    var [url, setUrl] = React.useState(null);
    var [editid, setEditid] = React.useState(null);
    const [links_, setLinks_] = React.useState([]);
   var [eth, setEth] = React.useState(null);
    var [FOSs, setFOSs] = React.useState([]);
  var [genders, setGenders] = React.useState([]);
   var [gender, setGender] = React.useState(null);
    function AddFAQ() {
        if (title == null || title === "") {
            Alert.alert("Please Enter Title.")
        } else if (desc == null || desc === "") {
            Alert.alert("Please Enter Description.")
        }
        else if (type == null) {
            Alert.alert("Please Select Type.")
        }
        else if (gpat == null || gpat === "") {
            Alert.alert("Please Enter Gpa To.")
        } else if (gpaf == null || gpaf === "") {
            Alert.alert("Please Enter Gpa From.")
        } else if (gpaf > gpat) {
            Alert.alert("Invalid GPA Range.")
        } else if (pos == null || pos === "") {
            Alert.alert("Please enter field of study")
        } else if (voa == null || voa === "") {
            Alert.alert("Please enter value of award")
        } else if (province == null || province === "") {
            Alert.alert("Please enter province")
        }
        else if (gender == null || gender === "") {
            Alert.alert("Please select gender")
        }
        else if (eth == null || eth === "") {
            Alert.alert("Please enter ethnicity")
        }
        else if (url == null || url === "") {
            Alert.alert("Please enter Url")
        }
        else if (date == null || date === "") {
            Alert.alert("Please select expire date.")
        }
        else {
            var d = new Date();
            const newLink = {
                title: title,
                description: desc,
                awardtype: type,
                GPAFrom: gpaf,
                GPATo: gpat,
                pos: pos,
                voa: voa,
                Ethnicity:eth,
                province: province,
                url: url,
                gender: gender,
                Expiredate: date
            };
            AddNewItem("Addawards", newLink)
            Alert.alert("Successfully Added!")
            goBack()
        }

    }
    async function getFOSFromFirebase() {

        await firebase.db.collection("field_of_study").onSnapshot(handleSnapshot__);
    }
    function handleSnapshot__(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setFOSs(links);
    }
    const [links, setLinks] = React.useState([]);
    function getLinks() {
        const lin = GetAllSnapshot("Awardtype", "")
        lin.onSnapshot(handleSnapshot)
    }
    function handleSnapshot(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return { id: doc.id,  ...doc.data() };
        });
        setLinks(links);
    }
    async function getGenderListFromFirebase() {

        await firebase.db.collection("gender").onSnapshot(handleSnapshot_);
    }
    function handleSnapshot_(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setGenders(links);
    }
    React.useEffect(() => {
        var today = new Date();
        var dd = today.getDate()
        var mm = today.getMonth() + 1
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd; 
        getLinks();
        getFOSFromFirebase();
        getGenderListFromFirebase();
    }, []);
    

    return (
        <>
            <Header backgroundColor="#6D0BD4"
                leftComponent={
                    <TouchableOpacity onPress={() => (goBack())}>
                        <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./back.png')} />

                    </TouchableOpacity>
                }
                centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
            />
            <ScrollView> 
                
                <Card
                    title="Add Award"
                >
                     
                        <View>
                                     <View>
                                <TextInput dense label="Title" mode="flat" onChangeText={(text) => setTitle(text)} style={{
                                    backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'
 }} />
                                
                                <TextInput dense
                                    type="flat"
                                    style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }}
                                    label="Description "

                                    onChangeText={(text) => setDesc(text)}
                                />
 
                                <TextInput dense keyboardType='numeric' label="GPA from " onChangeText={(text) => setGpaf(text)} style={{  backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />
                                 
                             
                                <TextInput dense keyboardType='numeric' label="GPA to " onChangeText={(text) => setGpat(text)} style={{  backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />
                            <Text style={{ alignItems: 'flex-start', marginLeft: '3%' }}>Field of study</Text>
                               <Picker

                                        style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom: '2%' }}
                                        selectedValue={pos}

                                        onValueChange={(itemValue, itemIndex) => setpos(itemValue)}
                                    >
                                        <Picker.Item label="--Select here--" value="" />
                                        {
                                            FOSs.map(links => (


                                                <Picker.Item label={links.type_name} value={links.type_name} />


                                            ))}


                            </Picker>


                            <TextInput dense label="Ethnicity" onChangeText={(text) => setEth(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} /> 

                            <TextInput dense label="Value of award " keyboardType="numeric" onChangeText={(text) => setvoa(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} /> 
                           
                                <TextInput dense label="Province/Territory" onChangeText={(text) => setProvince(text)} style={{  backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />

                            <Text style={{ alignItems: 'flex-start', marginLeft: '3%' }}>Gender</Text>
                            <Picker

                                style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom: '2%' }}
                                selectedValue={gender}

                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            >
                                <Picker.Item label="--Select here--" value="" />
                                {
                                    genders.map(links => (


                                        <Picker.Item label={links.typename} value={links.typename} />


                                    ))}


                            </Picker>
                            <TextInput dense label="URL " placeholder="https://..." value={url} onChangeText={(text) => setUrl(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%', marginBottom: '0%' }} />
                                <Text style={{ marginTop: '8%', marginLeft: '2%' }}>Select Category</Text>
                                <Picker

                                    style={{ borderBottomWidth: 1, marginTop: '0%', fontSize: '1', borderColor: '#8797ff' }}
                                    selectedValue={type}

                                    onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                                >
                                    {links.map(links => (

                                        <Picker.Item label={links.typename} value={links.typename} />
                                    ))}



                            </Picker>
                            <Text style={{ marginTop: '8%', marginLeft: '2%' }}> Expiry Date</Text>
                            <DatePicker
                                style={{ width: '100%', marginBottom: '10%' }}
                                date={date}
                                mode="date"
                                placeholder="Select date"
                                format="DD-MM-YYYY"
                                minDate={today}
                                
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                   
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { setDate(date) }}
                            />
                            </View>
                               


                        <Button onPress={AddFAQ} style={{}} mode="contained" color="#6D0BD4"  >Add</Button>
                             </View>

                       



                </Card>
            </ScrollView>
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
