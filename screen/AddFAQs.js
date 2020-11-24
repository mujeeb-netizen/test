import React from 'react';
import { StyleSheet, Text, View,  ScrollView, Picker} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Card, Header, ListItem, Button} from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
 
import AddNewItem from './DataRepository/AddNewItem';
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
import { TextInput, Button as NewBtn, Caption, Divider } from 'react-native-paper';
export default function AddFAQs({ route, navigation: { goBack } }) {
 
     
    var [question, setQuestion] = React.useState(null);
    var [ans, setAns] = React.useState(null);
    var [category, setCategory] = React.useState(null);
    function AddFAQ()
    {
        if (question == null) {
            Alert.alert("Please Enter Question.")
        } else if (ans == null) {
            Alert.alert("Please Enter Answer.")
        }
        else if (category == null) {
            Alert.alert("Please Select Category.")
        } else {
            var d = new Date();
        const newLink = {
            question: question,
            ans: ans,
            category_: category,
            created: d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
            };
            AddNewItem("FAQs", newLink)
            Alert.alert("Successfully Added!")
            goBack()
        }
      
    }
    const [links, setLinks] = React.useState([]);
    function getLinks_() {
        debugger
       
        const lin = GetAllSnapshot("FAQsCategory", "")
        lin.onSnapshot(handleSnapshot_)

    }
    function handleSnapshot_(snapshot) {
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
        
    }
    React.useEffect(() => {
        getLinks_()
        
    }, []);
    
    return (
        <>
            <Header
                // leftComponent={<Ionicons name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
            />
            <ScrollView>
                <Card
                    title="Add FAQs"
                >
                     
                        <View>
                           
                            <View>
                                <Text>{"\n"}</Text>
                                <TextInput dense label="Question" onChangeText={(text) => setQuestion(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }} />
                                 
                                <TextInput
                                    style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%'  }}
                            label="Answer..."
                            
                            onChangeText={(text) => setAns( text )}
                        />
                                <View><Text dense style={{ marginTop:'8%',marginLeft:'2%' }}>Select Category</Text>
                        <Picker

                            style={{ borderBottomWidth: 1, marginTop:'0%',marginBottom:'5%', fontSize: '1', borderColor: '#8797ff' }}
                            selectedValue={category}

                            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                                    >
                                        <Picker.Item label="--Select Here--" value="" />
                                {links.map(links => (
                                    
                                    <Picker.Item label={links.typename} value={links.typename} />
                                ))}

                          
                           
                            </Picker></View>
                            <Button onPress={AddFAQ} style={{}} title="Add" /> 
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
