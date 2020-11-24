import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, Image,TouchableOpacity } from 'react-native';

import { Card, Header, ListItem, Button ,Icon} from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import { TextInput, Button as NewBtn } from 'react-native-paper';
export default function AddAwardType({ navigation }) {
    function ViewList() {

        setIsedit(false)
        setViewlist(true);
        setType(null);

    }
    function AddNew() {

        setType(null);

        setViewlist(false);
    }
    var [loading, setLoading] = React.useState(null);
    var [viewlist, setViewlist] = React.useState(false);
    var [isEdit, setIsedit] = React.useState(false);
    var [created, setCreated] = React.useState(false);
    var [type, setType] = React.useState(null);

    var [editid, setEditid] = React.useState(null);
    const [links_, setLinks_] = React.useState([]);
    function getLinks_() {
        debugger
        setLoading(true);
        firebase.db.collection("Awardtype").onSnapshot(handleSnapshot_);
    }
    function deleteitem(id) {
        Alert.alert(
            'Delete Award type',
            'Are you sure you want to delete this item?',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => confrmdelete(id) },
            ]
        );
    }
    function confrmdelete(id) {
        const linkRef = firebase.db.collection("Awardtype").doc(id);
        linkRef
            .delete()
            .then(() => {
                Alert.alert(`Item deleted.`);
            })
            .catch(err => {
                Alert.alert("Error deleting document:", err);
            });
    }
    function UpdateAwardtype() {
        if (type == null || type === "") {
            Alert.alert("Please Enter Type.")
        }
        else {
            const voteRef = firebase.db.collection("Awardtype").doc(editid);
            voteRef.get().then(doc => {
                if (doc.exists) {
                    var d = new Date();
                    voteRef.update({
                        typename: type

                    });
                }
            });
            Alert.alert("Updated Successfully!")
            setEditid(null)
            setIsedit(false)
        }
    }
    function IsEdit(id) {

        setEditid(id)
        setType(null);

        const linkRef = firebase.db.collection('Awardtype').doc(id)
        linkRef.get().then(doc => {

            setType(doc.data().typename)



        })

        setIsedit(true)


    }
    function handleSnapshot_(snapshot) {
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setLinks_(links);
        setLoading(false);
    }

    function AddAwardtype() {
        if (type == null || type == "") {
            Alert.alert("Please Enter Type.")
        }
        else {
            var d = new Date();
            const newLink = {
                typename: type,

            };
            firebase.db.collection("Awardtype").add(newLink);
            Alert.alert("Successfully Added!")
            setViewlist(true)
        }

    }


    React.useEffect(() => {

        getLinks_();
    }, []);
    const [drawer, setDrawer] = React.useState(false);

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
                <Card
                    title="Add Awardtype - Setup"
                >
                    {!viewlist ?
                        <View>
                            <View><Button buttonStyle={{ backgroundColor:"#6D0BD4"}} style={{ marginBottom: '10%' }} title="View List" onPress={ViewList} 
                              
                             /></View>
                            <View>
                                <Text>{"\n"}</Text>
                                <TextInput dense label="Type" onChangeText={(text) => setType(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />



                                <Button buttonStyle={{ backgroundColor: "#6D0BD4" }} onPress={AddAwardtype} style={{}} title="Add" />
                            </View></View>

                        : !isEdit ?

                            <View>
                                <Button buttonStyle={{ backgroundColor: "#6D0BD4" }} title="Add New" onPress={AddNew} 
                                
                                 />


                                {
                                    links_.map(links_ => (

                                        <Card
                                            title={links_.typename}
                                        >


                                            <View style={{
                                                justifyContent: 'center',
                                                flexDirection: "row",
                                                marginTop: '4%'
                                            }}>
                                                <View><Button onPress={() => deleteitem(links_.id)} type="clear" 
                                                 icon={
                                                     <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./trash.png')} />

                                                  }

                                                 title="" /></View>
                                                <View style={{ marginLeft: '15%' }}>
                                                    <Button
                                                        onPress={() => IsEdit(links_.id)}
                                                        type="clear"
                                                        
                                                        icon={<Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./pencil.png')} />

                                                        }
                                                         title=" " /></View>
                                            </View>
                                        </Card>
                                        //<ListItem
                                        //    onPress={() => IsEdit(links_.id)}
                                        //    leftAvatar={{}}
                                        //    title={links_.question}
                                        //    subtitle={links_.category_}
                                        //    bottomDivider
                                        ///>
                                    ))
                                }

                            </View>
                            :

                            <View>
                                {isEdit ? <View><Button buttonStyle={{ backgroundColor: "#6D0BD4" }} style={{ marginBottom: '10%' }} title="Back to List" onPress={ViewList} 
                              
                                 /></View> : <View><Text></Text></View>}
                                <View>
                                    {isEdit ?
                                        <View>

                                            <TextInput dense label="Type" value={type} onChangeText={(text) => setType(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginTop: '10%', marginBottom: '10%' }} />



                                            <Button buttonStyle={{ backgroundColor: "#6D0BD4" }} onPress={() => UpdateAwardtype()} style={{}} title="Update" />
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
                                            <Button

                                                title="Loading"
                                                type="clear"
                                                loading
                                            />
                                        </View>}

                                </View></View>
                    }




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
