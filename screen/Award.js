import React from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl, ScrollView, Alert,Image, TouchableOpacity, Linking } from 'react-native';
import firebase from "../firebase/firebase";

import { Header, ListItem, Card, CardItem, Button, PricingCard  } from 'react-native-elements'
import { AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux' 
import { getUser } from '../store/actions'
import { editUser } from '../store/actions'
// import { Ionicons } from '@expo/vector-icons';
import { Caption, Chip, Divider  } from 'react-native-paper';
import axios from 'axios';
 

  

export default function Award({ navigation }) {  

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);

    var pres;
    const uid = useSelector(state => state.uid)
     
    const docid = useSelector(state => state.docid)
    const email = useSelector(state => state.email)
    const mystate = useSelector(state => state.state)
    const mygender = useSelector(state => state.gender)
    const myeth = useSelector(state => state.eth)
    const myfos = useSelector(state => state.pos)
    const role = useSelector(state => state.role)
    
    const [mygpa1, setMygpa1] = React.useState(false);
    const [mailsend, setMailsend] = React.useState(false);
    AsyncStorage.getItem('GPA')
        .then(results1 => {
            if (results1 === null) {


                setMygpa1("none")


            }
            else {


                setMygpa1(results1)


            }
        })
   


        
    var de;

    var [iscon1, setIscon1] = React.useState(null);
    var [isload, setIsload] = React.useState(false);
    
    var mygpa;
    console.log("iscon1-> ", iscon1)
    console.log("dsa")
    console.log(de)
    React.useEffect(() => {
        
        AsyncStorage.getItem('GPA')
            .then(results5 => {
                mygpa = results5
                if (results5 != null) {
                    firebase.db.collection("Addawards").where("GPAFrom", "<=", mygpa.replace(/['"]+/g, '')).onSnapshot(handleSnapshot__);


                } else {
                    setIsload(true)
                }
 
                
            })
        
       
        
       

    }, []);
 
    let [award, setAward] = React.useState([]);
     
  
    function handleSnapshot__(snapshot) {
        var today = new Date();
        today.setDate(today.getDate() - 1);

        const data = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        if (role == 1 || role == "1") {

       
        award = data.filter(function (el) { 
            
            
            var parts = el.Expiredate.split('-');
            // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
            // January - 0, February - 1, etc.
            var temp = new Date(parts[2], parts[1] - 1, parts[0]);
       
              return el.province.toUpperCase().trim() == mystate.toUpperCase().replace(/['"]+/g, '').trim() &&
                  parseFloat(el.GPATo) >= parseFloat(mygpa.replace(/['"]+/g, '')) && temp >= today
                  && el.Ethnicity.toUpperCase().trim() == myeth.toUpperCase().replace(/['"]+/g, '').trim()
                  && el.pos.toUpperCase().trim() == myfos.toUpperCase().replace(/['"]+/g, '').trim()
                  && el.gender.toUpperCase().trim() == mygender.toUpperCase().replace(/['"]+/g, '').trim()
          });
   }
   
        console.log(award);
        // console.log(data.length);
        setAward(award);
        setIsload(true)
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
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

            >
               
                {!iscon1 || typeof iscon1 == 'undefined' ?
 <>
                    <View style={{ marginLeft: '10%', marginRight: '10%', padding: '5%', borderRadius: 30, alignItems: 'center', marginTop: '0%' }}>
                        <Text style={{ fontSize: 20, fontWeight: '300', color: 'black' }}> Awards </Text>
                    </View>
                    <View style={{ width: "100%" }}>
                        {
                            award.length != 0 ?

                                award.map(links => (




                                    <Card
                                        title={links.title}
                                    >
                                        <View style={{
                                            justifyContent: 'center',
                                            flexDirection: "row",
                                            margin: '0%'

                                        }}>
                                            <Chip icon="book" mode="outlined" textStyle={{ fontSize: 12, fontWeight: 'bold' }}>{links.pos}</Chip><Text>{" "}</Text>
                                            <Chip icon="coin" mode="outlined" textStyle={{ fontSize: 12, fontWeight: 'bold' }}>{links.voa}</Chip><Text>{" "}</Text>
                                            <Chip icon="layers" mode="outlined" textStyle={{ fontSize: 12, fontWeight: 'bold' }}>{links.awardtype}</Chip>
                                        </View>
                                        <Caption style={{ fontSize: 17, marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
                                            {links.description}
                                        </Caption>

                                        <Button 
                                            buttonStyle={{ backgroundColor: '#6D0BD4',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                            title='VIEW NOW'
                                            onPress={() => (navigation.navigate("ApplyAward", { id: links.id }))}


                                             
                                        />


                                    </Card>

                                ))
                                :

                                <View style={{

                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>

                                    <Caption>No Awards Found!</Caption>
                                    <Divider />
                                       
                                    </View>
                            }
                            </View>
</>
                      
                  
                    :
                    <></>}
           
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
