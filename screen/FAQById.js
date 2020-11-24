import React from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Header, ListItem, Card, Button } from 'react-native-elements'
import { Caption, Divider } from 'react-native-paper'
import firebase from "../firebase/firebase";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import TouchableScale from 'react-native-touchable-scale';
import GetDataById from './DataRepository/GetDataById';

export default function FAQById({ route, navigation: { goBack } }) {


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

    function BackToLib() {

        setFaqview(false);

    }
    const [ques, setQues] = React.useState(null);
    const [ans, setAns] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [isload, setIsload] = React.useState(false);
    const [faqview, setFaqview] = React.useState(false);
    function getAns(id) {
        const linkRef = GetDataById("FAQs",id)
        linkRef.get().then(doc => {

            setQues(doc.data().question)
            setAns(doc.data().ans)
            setType(doc.data().category_)
            
        })
        setIsload(true)
    }
    const [links, setLinks] = React.useState([]);
    React.useEffect(() => {
        const { id } = route.params;
        getAns(id)

    }, []);

 

    if (!isload || !ans) {
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
                        // leftComponent={<Ionicons name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                        centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
                    />


                    <View>

                        <Card
                            title={ques}
                        >
                            <Card style={{ marginBottom: '6%' }}>
                                <Text>{ans}</Text>
                                <Divider/>
                                <Caption>{type}</Caption>
                            </Card>




                             
                        </Card>


                    </View>




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
