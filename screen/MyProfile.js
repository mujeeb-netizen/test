import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import firebase from "../firebase/firebase";
import { Header, ListItem, Card, CardItem, Button, PricingCard,Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'

import { Caption } from 'react-native-paper';
import { Avatar, Divider } from 'react-native-paper';

export default function MyProfile({ navigation }) {
 
    const docid = useSelector(state => state.docid)
    var remail = useSelector(state => state.email)
    var rgender = useSelector(state => state.gender)
    var rcountry = useSelector(state => state.country)
    var rstate = useSelector(state => state.state)
    var rcity = useSelector(state => state.city)
    var raddress = useSelector(state => state.address)
    var rzip = useSelector(state => state.zip)
    var rphone = useSelector(state => state.phone)
    var rahi = useSelector(state => state.ahi)
    var reth = useSelector(state => state.eth)
    var rgpa = useSelector(state => state.gpa)
    var rcun = useSelector(state => state.cun)
    var rcu = useSelector(state => state.cu)
    var rfname = useSelector(state => state.fname)
    var rlname = useSelector(state => state.lname)

    if (rgender == null || typeof rgender == "undefined") {
        rgender = "N/A"
    }
    if (rstate == null || typeof rstate == "undefined") {
        rstate = "N/A"
    }
    if (rcity == null || typeof rcity == "undefined") {
        rcity = "N/A"
    } if (raddress == null || typeof raddress == "undefined") {
        raddress = "N/A"
    } if (rzip == null || typeof rzip == "undefined") {
        rzip = "N/A"
    }if (rahi == null || typeof rahi == "undefined") {
        rahi = "N/A"
    }
    if (reth == null || typeof reth == "undefined") {
        reth = "N/A"
    }if (rgpa == null || typeof rgpa == "undefined") {
        rgpa = "N/A"
    }if (rcun == null || typeof rcun == "undefined") {
        rcun = "N/A"
    }if (rcu == null || typeof rcu == "undefined") {
        rcu = "N/A"
    }
    if (rfname == null || typeof rfname == "undefined") {
        rfname = "N/A"
    }
    if (rlname == null || typeof rlname == "undefined") {
        rlname = "N/A"
    } if (rcountry == null || typeof rcountry == "undefined") {
        rcountry = "N/A"
    } if (rphone == null || typeof rphone == "undefined") {
        rphone = "N/A"
    } if (remail == null || typeof remail == "undefined") {
        remail = "N/A"
    } 
  


      
     

        const [drawer, setDrawer] = React.useState(null);
        return (
            <><Header backgroundColor="#6D0BD4"
                leftComponent={<Icon name="arrow-left" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
                centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
            />
                <ScrollView>
                    
                        <Card title="My Profile" >
                        <View style={{ alignItems: 'center' }}>
                            <Avatar.Text size={124} label={rfname.charAt(1) + "" + rlname.charAt(1)} />
                            </View>

                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Name: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                { <Icon name="contacts" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rfname.replace(/['"]+/g, '') + " " + rlname.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Gender: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="accessibility" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rgender.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Email: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                { <Icon name="email" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{remail.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Country: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                    { <Icon name="home" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rcountry.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Province/Territory: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="explore" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rstate.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>City: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="leaderboard" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rcity.replace(/['"]+/g, '')}</Caption>
                            </View>

                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Address: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="web" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{raddress.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Postal Code: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="payment" color="#6D0BD4" size={28} />}
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rzip.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>

                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Phone: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="phone" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rphone.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Annual Income: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="money" color="#6D0BD4" size={28} />}
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rahi.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}> Ethinicity: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="people" color="#6D0BD4" size={28} />}
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{reth.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}> GPA: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="grade" color="#6D0BD4" size={28} />}
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rgpa.replace(/['"]+/g, '')}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}> College/University: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                    {<Icon name="place" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rcu.replace(/['"]+/g, '') == 1 ? "University" : "College"}</Caption>
                            </View>
                            <Text>{"\n"}</Text>
                            <Text style={{ fontSize: 20, marginBottom: '3%' }}> College/University Name: </Text>
                            <Divider />
                            <View style={{

                                flexDirection: 'row',

                                textAlign: 'center'
                            }}>
                                <Text>
                                {<Icon name="leaderboard" color="#6D0BD4" size={28} /> }
                                </Text>
                                <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rcun.replace(/['"]+/g, '') }</Caption>
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
