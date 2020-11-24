import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import firebase from "../firebase/firebase";
import { Icon, Header, ListItem, Card, CardItem, Button } from 'react-native-elements'
import Markdown from 'react-native-easy-markdown';

export default function Library() {

    var [links, setLinks] = React.useState([]);
    var [con, setCon] = React.useState(null);
    var [isload, setIsload] = React.useState(false);
    var [loading, setLoading] = React.useState(null);
    var [title, setTitle] = React.useState(null);
    var [iscon, setIscon] = React.useState(null);
    console.log("iscon - >", iscon)
    function BackToLib() {
        console.log("inbacktolib")
        setIscon(null);

    }
    React.useEffect(() => {
        firebase.db.collection("LibContent").onSnapshot(handleSnapshot);
    }, []);
    function goToView(id, flag) {
        setLoading(true)
        console.log("ingotoview")
        console.log(flag)



        const linkRef = firebase.db.collection('LibContent').doc(id)
        linkRef.get().then(doc => {
            debugger
            setTitle(doc.data().title)
            var a = doc.data().content;
            setCon(a)
            setIscon(true)
            setLoading(false);
        })


    }

    function handleSnapshot(snapshot) {
        console.log('handles')
        data = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });

        links = data;

        setLinks(links);
        setIsload(true);
        // setLoading(false);
    }

    if (!isload) {
        return (
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button

                    title="Loading"
                    type="clear"
                    loading
                />
            </View>
            );
    } else { 
    return (

        <ScrollView>
            <View style={{ height: '100%' }}>
                {!iscon || typeof iscon == 'undefined' ?
                    <>
                        <View style={{ marginLeft: '10%', marginRight: '10%', padding: '5%', borderRadius: 30, alignItems: 'center', marginTop: '0%' }}>
                            <Text style={{ fontSize: 20, fontWeight: '300', color: 'black' }}> Library </Text>

                        </View>
                        <View style={{ width: "100%" }}>
                            {links.map(links => (
                                <Card
                                    title={links.title}
                                >
                                    <Text style={{ marginBottom: 10, textAlign: 'center', color:'#7d7d7d'}}>
                                        {links.type} - {links.created}
                                    </Text>

                                    <Button
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='VIEW NOW'
                                        onPress={() => (goToView(links.id, "1")


                                        )}
                                    />


                                </Card>

                            ))}
                        </View>
                    </>
                    :
                    <>
                        <Card style={{ display: 'flex' }} title={title}


                        >



                            <Markdown>{con}

                            </Markdown>
                            <View style={{ bottom: 0, alignSelf: 'flex-end', zIndex: 1 }}>
                                <Button
                                    onPress={() => (BackToLib())}
                                    title=" Back"
                                    icon={{ name: "arrow-right", color: 'white' }}
                                    backgroundColor='white'
                                    rounded
                                    type="clear"
                                />
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
