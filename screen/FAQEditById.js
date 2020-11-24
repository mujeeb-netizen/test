import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Card, Header, ListItem, Button } from 'react-native-elements'
import firebase from "../firebase/firebase";
import { Alert } from 'react-native';
import DeleteItem from './DataRepository/DeleteItem';
import UpdateItem from './DataRepository/UpdateItem';
import GetDataById from './DataRepository/GetDataById';
 
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
import { TextInput, Button as NewBtn, Caption, Divider } from 'react-native-paper';
export default function FAQEditById({ route, navigation: { goBack } }) {
   var [created, setCreated] = React.useState(false);
    var [question, setQuestion] = React.useState(null);
    var [ans, setAns] = React.useState(null);
    var [category, setCategory] = React.useState(null);
    var [editid, setEditid] = React.useState(null);
   
  
   
 
    
    
   
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
        const { editis } = route.params;
        IsEdit(editis)
        getLinks_()

    }, []);


    function UpdateFAQ() {
        if (question == null || question === "") {
            Alert.alert("Please Enter Question.")
        } else if (ans == null || ans === "") {
            Alert.alert("Please Enter Answer.")
        }
        else if (category == null || category === "") {
            Alert.alert("Please Select Category.")
        } else {
            var d = new Date();
            const data = {


                question: question,
                ans: ans,
                category_: category,
                created: d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()


            }
            UpdateItem("FAQs", editid, data)
            Alert.alert("Updated Successfully!")
            goBack()
        }
    }
    function IsEdit(id) {
        setEditid(id)
        setQuestion(null);
        setAns(null);
        const linkRef = GetDataById("FAQs", id)

        linkRef.get().then(doc => {
            debugger
            setQuestion(doc.data().question)
            setAns(doc.data().ans)
            setCreated(doc.data().created)
            setCategory(doc.data().category_)





        })
       

    }

 
 
     

    return (
        <>
            <Header
                // leftComponent={<Ionicons name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                centerComponent={{ text: 'The FlipApp', style: { color: '#fff' } }}
            />
            <ScrollView>
                <Card
                    title="Add FAQs"
                >
                    
                    <View>
                         
                            <View>
                                {created ?
                                    <View>

                                        <TextInput dense label="Question" value={question} onChangeText={(text) => setQuestion(text)} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginTop: '10%', marginBottom: '10%' }} />

                                        <TextInput dense
                                            value={ans}
                                            style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: '10%' }}
                                            label="Answer..."
                                            multiline={true}
                                            onChangeText={(text) => setAns(text)}
                                        />
                                        <View><Text style={{ marginTop: '8%', marginLeft: '2%' }}>Select Category</Text>
                                            <Picker

                                                style={{ borderBottomWidth: 1, marginTop: '0%', marginBottom: '5%', fontSize: '1', borderColor: '#8797ff' }}
                                                selectedValue={category}

                                                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                                            >
                                                {links.map(links => (

                                                    <Picker.Item label={links.typename} value={links.typename} />
                                                ))}



                                            </Picker></View>
                                        <Button onPress={() => UpdateFAQ()} style={{}} title="Update" />
                                </View> :
                                <View style={{
                                       
                                        top: 5,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: '1%'
                                }}>
                                    
                                    <Button
                                        loadingStyle={{ fontSize: '3' }}
                                        title="Loading"
                                        type="clear"
                                        loading
                                        titleStyle={{ color:'black'}}
                                        />
                                    
                                </View>
                                }

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
