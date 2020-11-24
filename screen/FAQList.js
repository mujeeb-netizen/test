import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';

import { Icon, Card, Header, ListItem, Button } from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import DeleteItem from './DataRepository/DeleteItem';
import UpdateItem from './DataRepository/UpdateItem';
import GetDataById from './DataRepository/GetDataById';
import AddNewItem from './DataRepository/AddNewItem';
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
import { TextInput, Button as NewBtn, Caption, Divider } from 'react-native-paper';
export default function FAQList({ navigation }) {
    var [loading, setLoading] = React.useState(null);
  
    
    const [links_, setLinks_] = React.useState([]);
    function getLinks_() {
        debugger
        setLoading(true);
        const lin = GetAllSnapshot("FAQs", "")
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
        DeleteItem("FAQs", id)
    }
 
    

    function handleSnapshot_(snapshot) {
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setLinks_(links);
        setLoading(false);
    }

 

  

  

   

    React.useEffect(() => {
       
        getLinks_();
    }, []);
 
    return (
        <>

           <Text>FOQ list</Text>
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
