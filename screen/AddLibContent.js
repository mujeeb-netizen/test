import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Card, Header, ListItem, Button,Input } from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';

export default function AddLibContent({ navigation }) {
    function ViewList() {
        setIsedit(false)
        setViewlist(true);
        setTitle(null);
       setContent(null);
       setCreated(null);
    }
    function AddNew() {

        setTitle(null);
       setContent(null);
        setViewlist(false);
    }
    var [loading, setLoading] = React.useState(null);
    var [viewlist, setViewlist] = React.useState(false);
    var [isEdit, setIsedit] = React.useState(false);
    var [created, setCreated] = React.useState(false);
    var [title, setTitle] = React.useState(null);
    var [content, setContent] = React.useState(null);
    var [type, setType] = React.useState("Blog");
    var [editid, setEditid] = React.useState(null);
    const [links_, setLinks_] = React.useState([]);
    function getLinks_() {
        debugger
        setLoading(true);
        firebase.db.collection("LibContent").onSnapshot(handleSnapshot_);
    }
    function deleteitem(id) {
        Alert.alert(
            'Delete FAQ',
            'Are you sure you want to delete this item?',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => confrmdelete(id) },
            ]
        );
    }
    function confrmdelete(id) {
        const linkRef = firebase.db.collection("LibContent").doc(id);
        linkRef
            .delete()
            .then(() => {
                Alert.alert(`Item deleted.`);
            })
            .catch(err => {
                Alert.alert("Error deleting document:", err);
            });
    }
    function UpdateFAQ() {
        if (title == null || title === "") {
            Alert.alert("Please Enter Title.")
        } else if (content == null || content === "") {
            Alert.alert("Please Enter Content.")
        }
        else if (type == null || type === "") {
            Alert.alert("Please Select Type.")
        } else {
            const voteRef = firebase.db.collection("LibContent").doc(editid);
            voteRef.get().then(doc => {
                if (doc.exists) {

                    var d = new Date();

                    voteRef.update({
                        title: title,
                        content: content,
                        type: type,
                        created: d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()

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
        setTitle(null);
       setContent(null);
        const linkRef = firebase.db.collection('LibContent').doc(id)
        linkRef.get().then(doc => {
            debugger
            setTitle(doc.data().title)
            setContent(doc.data().content)
            setCreated(doc.data().created)
            setCategory(doc.data().type)





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

    function AddLibContent() {
        if (title == null) {
            Alert.alert("Please Enter Title.")
        } else if (content == null) {
            Alert.alert("Please Enter Content.")
        }
        else if (type == null) {
            Alert.alert("Please Select Type.")
        } else {
         
var d = new Date();
                
            const newLink = {
                title: title,
                content: content,
                type: type,
                created: d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
            };
            firebase.db.collection("LibContent").add(newLink);
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
            
            <ScrollView>
                <Card
                    title="Add Library Content"
                >
                    {!viewlist ?
                        <View>
                            <View><Button title="View List" onPress={ViewList} type="clear" /></View>
                            <View><Text style={{ marginTop: '8%', marginLeft: '2%' }}>Title*</Text>
                                <Input placeholder="Title" onChangeText={(text) => setTitle(text)} style={{ borderBottomWidth: 1, borderColor: '#8797ff' }} />
                                <Text style={{ marginTop: '8%', marginLeft: '2%' }}>Content*</Text>
                                <Input
                                    style={{ borderBottomWidth: 1, borderTopWidth: 1, marginTop: '4%', padding: '1%', borderColor: '#8797ff' }}
                                    placeholder="Content..."

                                    onChangeText={(text) => setContent(text)}
                                />
                                <View><Text style={{ marginTop: '8%', marginLeft: '2%' }}>Select Type</Text>
                                    <Picker

                                        style={{ borderBottomWidth: 1, marginTop: '0%', marginBottom: '5%', fontSize: '1', borderColor: '#8797ff' }}
                                        selectedValue={type}

                                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                                    >
                                        

                                        <Picker.Item label="Blog" value="Blog" />
                                        <Picker.Item label="Video" value="Video" />
                                        



                                    </Picker></View>
                                <Button onPress={AddLibContent} style={{}} title="Add" />
                            </View></View>

                        : !isEdit ?

                            <View>
                                <Button title="Add New" onPress={AddNew} type="clear" />


                                {
                                    links_.map(links_ => (

                                        <Card
                                            title={links_.title}
                                        >
                                            <Text style={{ marginBottom: 10, textAlign: 'center', color: '#7d7d7d' }}>
                                                Last Updated - {links_.created}
                                            </Text>
                                            <View style={{
                                                justifyContent: 'center',
                                                flexDirection: "row",
                                                marginTop: '4%'
                                            }}>
                                                <View><Button onPress={() => deleteitem(links_.id)} type="clear" icon={
                                                    <Icon
                                                        name="delete"
                                                        size={20}
                                                        color="red"
                                                    />
                                                } title="" /></View>
                                                <View style={{ marginLeft: '15%' }}>
                                                    <Button
                                                        onPress={() => IsEdit(links_.id)}
                                                        type="clear"
                                                        icon={<Icon
                                                            name="edit"
                                                            size={20}
                                                            color="blue"
                                                        />} title=" " /></View>
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
                                {created ? <View><Button title="Back to List" onPress={ViewList} type="clear" /></View> : <View><Text></Text></View>}
                                <View>
                                    {created ?
                                        <View><Text style={{ marginTop: '8%', marginLeft: '2%' }}>Title*</Text>
                                            <Input placeholder="Title" value={title} onChangeText={(text) => setTitle(text)} style={{ borderBottomWidth: 1, borderColor: '#8797ff' }} />
                                            <Text style={{ marginTop: '8%', marginLeft: '2%' }}>Content*</Text>
                                            <Input
                                                value={content}
                                                style={{ borderBottomWidth: 1, borderTopWidth: 1, marginTop: '4%', padding: '1%', borderColor: '#8797ff' }}
                                                placeholder="Content..."
                                                multiline={true}
                                                onChangeText={(text) => setContent(text)}
                                            />
                                            <View><Text style={{ marginTop: '8%', marginLeft: '2%' }}>Select Type</Text>
                                                <Picker

                                                    style={{ borderBottomWidth: 1, marginTop: '0%', marginBottom: '5%', fontSize: '1', borderColor: '#8797ff' }}
                                                    selectedValue={type}

                                                    onValueChange={(itemValue, itemIndex) => setTypr(itemValue)}
                                                >    
                                                    

                                                        <Picker.Item label="Blog" value="Blog"/>
                                                        <Picker.Item label="Video" value="Video"/>
                                                   



                                                </Picker></View>
                                            <Button onPress={() => UpdateFAQ()} style={{}} title="Update" />
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
