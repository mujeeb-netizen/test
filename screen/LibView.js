import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import firebase from "../firebase/firebase";
import { Icon, Header, ListItem, Card, CardItem, Button } from 'react-native-elements'
import Markdown from 'react-native-easy-markdown';

export default function LibView({ navigation}) {
    var id = navigation.getParam('id');
    goToView(id)
    
    var [con, setCon] = React.useState(null);
    var [title, setTitle] = React.useState(null);
 

    function BackToLib() {

        iscon = null;
        setTitle(null);
        setCon(null);
    }
 

    function goToView(id) {


        const linkRef =   firebase.db.collection('LibContent').doc(id)
        linkRef.get().then(doc => {
            debugger
            setTitle(doc.data().title)
            var a = doc.data().content;
            setCon(a)
         
        })


    }
   
   
    return (

        <ScrollView>
            <View style={{ height: '100%' }}>
                 
                    <>
                        <Card style={{ display: 'flex' }} title={title}


                        >



                            <Markdown>{con}

                            </Markdown>
                            <View style={{ bottom: 0, alignSelf: 'flex-end', zIndex: 1 }}>
                                <Button
                                    onPress={BackToLib}
                                    title=" Back"
                                    icon={{ name: "arrow-right", color: 'white' }}
                                    backgroundColor='white'
                                    rounded
                                    type="clear"
                                    accessibilityLabel="Back" />
                            </View>

                        </Card>
                        <View style={{ flex: 1 }}>

                        </View>
                    </>
                }
            </View>
        </ScrollView>
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
