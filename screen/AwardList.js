import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image,Picker } from 'react-native';

import { Card, Header, ListItem, Button as ElementBtn ,Icon} from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import { TextInput, Button, Caption, Divider } from 'react-native-paper';
import DeleteItem from './DataRepository/DeleteItem';
 
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
export default function AwardList({ navigation  }) {



   
     
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
    function getLinks_() {
        debugger
        setLoading(true);
       
        const lin = GetAllSnapshot("Addawards", "")
        lin.onSnapshot(handleSnapshot_)
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
        DeleteItem("Addawards", id)
    }
   
     
    function handleSnapshot_(snapshot) {
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setLinks_(links);
        setLoading(false);
    }

     

    const [links, setLinks] = React.useState([]);
    
   
    React.useEffect(() => {
        
        getLinks_();
    }, []);
    const [drawer, setDrawer] = React.useState(false);

    return (
        <>

            <ScrollView>

                <Card
                    title="Add Award"
                >
              

                    <View>
                        <ElementBtn buttonStyle={{ backgroundColor: "#6D0BD4" }} title="Add New" onPress={() => (navigation.navigate("AddAward"))}
                           
                        />


                                {
                                    links_.length != 0 ?
                                        links_.map(links_ => (

                                            <Card
                                                title={links_.title}
                                            >

                                                <View><Text style={{ fontSize: 15, textAlign: "center" }}>Description: {links_.description}</Text></View>
                                                <View><Text style={{ fontSize: 15, textAlign: "center" }}>Expire: {links_.Expiredate}</Text></View>
                                                <View style={{
                                                    justifyContent: 'center',
                                                    flexDirection: "row",
                                                    marginTop: '4%'
                                                }}>
                                                    <View><ElementBtn onPress={() => deleteitem(links_.id)} type="clear" icon={
                                                       
                                                            <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./trash.png')} />

                                                         
                                                    } title="" /></View>
                                                    <View style={{ marginLeft: '15%' }}>
                                                        <ElementBtn
                                                            onPress={() => navigation.navigate("EditAward", { id: links_.id })}
                                                            type="clear"
                                                            icon={<Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./pencil.png')} />
} title=" " /></View>
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
                                        : <View style={{

                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>

                                            <Caption>No Awards Found!</Caption>
                                            <Divider />
                                        </View>
                                }

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
