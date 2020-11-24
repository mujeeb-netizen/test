import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Card, Header, ListItem, Button } from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import { TextInput, Button as NewBtn } from 'react-native-paper';
export default function AddGender({ navigation }) {
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
        firebase.db.collection("gender").onSnapshot(handleSnapshot_);
    }
    function deleteitem(id) {
        Alert.alert(
            'Delete Gender',
            'Are you sure you want to delete this item?',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => confrmdelete(id) },
            ]
        );
    }
    function confrmdelete(id) {
        const linkRef = firebase.db.collection("gender").doc(id);
        linkRef
            .delete()
            .then(() => {
                Alert.alert(`Item deleted.`);
            })
            .catch(err => {
                Alert.alert("Error deleting document:", err);
            });
    }
    function UpdateGender() {
        if (type == null || type === "") {
            Alert.alert("Please Enter Type.")
        } 
        else {
            const voteRef = firebase.db.collection("gender").doc(editid);
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
         
        const linkRef = firebase.db.collection('gender').doc(id)
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

    function AddGender() {
        if (type == null || type=="") {
            Alert.alert("Please Enter Type.")
        }  
        else {
            var d = new Date();
            const newLink = {
                typename: type,
               
            };
            firebase.db.collection("gender").add(newLink);
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
            <Header
                // leftComponent={<Ionicons name="md-list" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
                centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
            />
            <ScrollView>
                <Card
                    title="Add Gender - Setup"
                >
                    {!viewlist ?
                        <View> 
                            <View><Button style={{ marginBottom: '10%' }} title="View List" onPress={ViewList}
                            //  icon={
                                // <Ionicons name="md-menu" color="#fff" size={20} style={{ marginRight: '1%' }} />
                            // } 
                            /></View>
                            <View>
                                <Text>{"\n"}</Text>
                                <TextInput dense label="Type" onChangeText={(text) => setType(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }} />

                                
                               
                                <Button onPress={AddGender} style={{}} title="Add" />
                            </View></View>

                        : !isEdit ?

                            <View>
                                <Button title="Add New" onPress={AddNew} 
                                // icon={
                                //     // <Ionicons name="md-add" color="#fff" size={20} style={{ marginRight: '1%' }} />
                                // } 
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
                                                // icon={
                                                //     <Icon
                                                //         name="delete"
                                                //         size={20}
                                                //         color="red"
                                                //     />
                                                // }
                                                 title="" /></View>
                                                <View style={{ marginLeft: '15%' }}>
                                                    <Button
                                                        onPress={() => IsEdit(links_.id)}
                                                        type="clear"
                                                        // icon={<Icon
                                                        //     name="edit"
                                                        //     size={20}
                                                        //     color="blue"
                                                        // />} 
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
                                {isEdit ? <View><Button style={{ marginBottom: '10%' }} title="Back to List" onPress={ViewList}
                                //  icon={
                                //     // <Ionicons name="md-arrow-round-back" color="#fff" size={20} style={{ marginRight: '1%' }} />
                                // }
                                 /></View> : <View><Text></Text></View>}
                                <View>
                                    {isEdit ?
                                        <View>

                                            <TextInput dense label="Type" value={type} onChangeText={(text) => setType(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginTop: '10%', marginBottom: '10%' }} />

                                           
                                     
                                            <Button onPress={() => UpdateGender()} style={{}} title="Update" />
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
