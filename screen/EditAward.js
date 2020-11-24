import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity,Image } from 'react-native';

import { Card, Header, ListItem, Button as ElementBtn,Icon } from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import { TextInput, Button, Caption, Divider } from 'react-native-paper';
import UpdateItem from './DataRepository/UpdateItem';
import GetDataById from './DataRepository/GetDataById';
import DatePicker from 'react-native-datepicker'
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
export default function EditAward({ route, navigation: { goBack } }) {

    var today = new Date();
    var dd = today.getDate()
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
    var [exp, setExp] = React.useState(null);
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
    function UpdateFAQ() {
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
        }
        else if (eth == null || eth === "") {
            Alert.alert("Please enter Ethnicity")
        } else if (province == null || province === "") {
            Alert.alert("Please enter province")
        }
        else if (gender == null || gender === "") {
            Alert.alert("Please select gender.")
        }
        else if (url == null || url === "") {
            Alert.alert("Please enter Url")
        }
        else if (exp == null || exp === "") {
            Alert.alert("Please enter Expire date.")
        }
        else {var d = new Date();
            const data = {
                title: title,
                description: desc,
                awardtype: type,
                GPAFrom: gpaf,
                GPATo: gpat,
                pos: pos,
                gender: gender,
                Ethnicity:eth,
                voa: voa,
                province: province,
                url: url,
                Expiredate: exp
            }
            UpdateItem("Addawards", editid, data)
             
            Alert.alert("Updated Successfully!")
            setEditid(null)
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
    function IsEdit(id) {
        setEditid(id)
        setTitle(null);
        setDesc(null);
        const linkRef = GetDataById("Addawards", id)
        linkRef.get().then(doc => {
            debugger
            setTitle(doc.data().title)
            setDesc(doc.data().description)
            setCreated(doc.data().Expiredate)
            setType(doc.data().awardtype)
            setGpaf(doc.data().GPAFrom)
            setGpat(doc.data().GPATo)
            setpos(doc.data().pos)
            setvoa(doc.data().voa)
            setProvince(doc.data().province)
            setUrl(doc.data().url)
            setGender(doc.data().gender)
            setEth(doc.data().Ethnicity)
            setExp(doc.data().Expiredate)
             




        })
        setIsedit(true)

    }
  

   
    const [links, setLinks] = React.useState([]);
    function getLinks() {
        const lin = GetAllSnapshot("Awardtype", "")
        lin.onSnapshot(handleSnapshot)
    }
    function handleSnapshot(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
    }
    React.useEffect(() => {
        const { id } = route.params;
        IsEdit(id )
        getLinks();
        getFOSFromFirebase();
        getGenderListFromFirebase();

    }, []);
    const [drawer, setDrawer] = React.useState(false);

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
                    title="Edit Award"
                >
                    

<View>
                          
                                <View>
                                    {created ?
                                        <View>
                                            <TextInput dense label="Title" value={title} onChangeText={(text) => setTitle(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />

                                            <TextInput dense
                                                value={desc}
                                                style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }}
                                                label="Description "
                                                multiline={true}
                                                onChangeText={(text) => setDesc(text)}
                                            />

                                            <TextInput dense keyboardType='numeric' value={gpaf} label="GPA from " onChangeText={(text) => setGpaf(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />


                                            <TextInput dense keyboardType='numeric' value={gpat} label="GPA to " onChangeText={(text) => setGpat(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />

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
                                    <TextInput dense label="Ethnicity" value={eth} onChangeText={(text) => setEth(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} /> 

                                            <TextInput dense label="Value of award " keyboardType='numeric' value={voa} onChangeText={(text) => setvoa(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />

                                            <TextInput dense label="Province/Territory" value={province} onChangeText={(text) => setProvince(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />
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


                                            <TextInput dense label="URL " value={url} onChangeText={(text) => setUrl(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%', marginBottom: '0%' }} />
                                            <Text style={{ marginTop: '8%', marginLeft: '2%' }}>Select Category</Text>
                                            <Picker

                                                style={{ borderBottomWidth: 1, marginTop: '0%', marginBottom: '0%', fontSize: '1', borderColor: '#8797ff' }}
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
                                        date={exp}
                                        mode="date"
                                        placeholder="Select date"
                                        format="DD-MM-YYYY"
                                        
                                        selectedValue={exp}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },

                                            
                                        }}
                                        onDateChange={(date) => { setExp(date) }}
                                    />
                                    <ElementBtn buttonStyle={{ backgroundColor:'#6D0BD4' }} onPress={() => UpdateFAQ()} style={{ marginTop: '10%' }} title="Update" />
                                        </View> :
                                        <View style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: '1%'
                                        }}>
                                            <ElementBtn
                                        loadingStyle={{ color: '#6D0BD4' }}
                                        titleStyle={{ color: '#6D0BD4' }}
                                        style={{ color: '#6D0BD4' }}
                                                title="Loading"
                                                type="clear"
                                                loading
                                            />
                                        </View>}

                                </View></View>
 
                            



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
