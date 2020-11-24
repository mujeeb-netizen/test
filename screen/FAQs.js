import React from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl,ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Header, ListItem, Card, Button } from 'react-native-elements'
import { Caption, Divider } from 'react-native-paper'
import firebase from "../firebase/firebase";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import GetAllSnapshot from './DataRepository/GetAllSnapshot';
import TouchableScale from 'react-native-touchable-scale';
export default function FAQs({ navigation }) {


    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

 
    const [ques, setQues] = React.useState(null);
    const [ans, setAns] = React.useState(null);
    const [isload, setIsload] = React.useState(false);
    const [faqview, setFaqview] = React.useState(false);
 
    const [links, setLinks] = React.useState([]);
    React.useEffect(() => {
        GetAllSnapshot("FAQs").onSnapshot(handleSnapshot);
    }, []);

    function handleSnapshot(snapshot) {
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
        setIsload(true)

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
                <>
                    <Header backgroundColor="#6D0BD4"
                        // leftComponent={<Ionicons name="md-list" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
                        centerComponent={{ text: 'The FlipApp', style: { color: '#fff' } }}
                    />
                    <Card title="FAQs">
                    
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            {
                                links.length != 0 ? 
                                links.map(links => (

                                    <ListItem
                                        onPress={() => navigation.navigate("FAQById", { id: links.id })}
                                        leftIcon={{ name: "md-book" }}
                                        title={links.question}
                                        subtitle={links.category_}
                                        bottomDivider
                                        chevron
                                        Component={TouchableScale}
                                        friction={90} //
                                        tension={100} // These props are passed to the parent component (here TouchableScale)
                                        activeScale={0.95} //
                                        
                                        
                                />


                                ))
                                    :
                                    <View style={{

                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>

                                        <Caption>No FAQs Found!</Caption>
                                        <Divider />
                                    </View>



                        }
                        </ScrollView>
                    </Card>
                </>
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
