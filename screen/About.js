import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { Header, ListItem, Card, CardItem, PricingCard, Button } from 'react-native-elements';
import { Divider, Icon } from 'react-native-elements';                 

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Caption, Chip } from 'react-native-paper';
export default function About({ navigation }) {
  
    return (<>
        <Header backgroundColor="#6D0BD4"
            leftComponent={
                <TouchableOpacity onPress={() => (navigation.openDrawer())}>
                    <Image style={{ width: 25, height: 25, marginTop:'6%' }} source={require('./menu.png')} />

                </TouchableOpacity>
            }
            centerComponent={{ text: 'About FLIP', style: { color: '#fff' } }}
        />
        <ScrollView>
        
            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}> 
                <Image
                    style={{
                        marginTop: '4%',
                        marginBottom: '2%',
                        
                        height: hp('9%'),
                        resizeMode: 'contain',
                    }}
                    source={require('../logo2.png')}
                />
            </View>
            <View style={{ paddingLeft: '8%', paddingRight:'8%', width: '100%', alignItems: 'center' }}>
               
                <Text style={{ color: '#403f3c', marginBottom: '3%' }}>FLIP is committed to delivering access to free financial assistance in the form of scholarships, grants, and bursaries to Canadian post secondary students that are studying across Canada.</Text>
                <Text style={{ color: '#403f3c', marginBottom: '3%' }}>Every year over $11 million dollars in student award programs are never claimed due to a lack of awareness that these funds even exist. We understand that Canadians post secondary students can become overwhelmed with their studies, and the lack of finances during their studies can add even more stress to their physical and mental well being. </Text>
                <Text style={{ color: '#403f3c', marginBottom: '3%' }}>FLIP was created by a post secondary student who saw the benefit of having access to these free financial assistance funds to help pay for school fees, and even basic needs. Financial security while attending classes is crucial for a students overall academic performance. We understood that, and decided it was time to make a change.</Text>
                <Text style={{ color: '#403f3c', marginBottom: '3%' }}>There are thousands of student award programs available in Canada for Canadian post secondary students to claim, and now FLIP will deliver these programs directly into your hands. FLIP will revolutionize free financial assistance delivery in Canada, and users will no longer have to search through tons of mega data on the internet to find suitable free financial assistance programs. At the click of a button, you will have access to as many student award programs that you desire to apply, and receive.</Text>
                <Text style={{ color: '#403f3c', marginBottom: '3%' }}>The best part about downloading FLIP is that unlike student loans, these student award programs available on our app (scholarships, grants, and bursaries) are not required to be paid back, so it is literally access to free money!!</Text>
                <Caption style={{ fontSize:17 }}>Adam Dalal</Caption>
                <Caption>CEO & Founder, FLIP</Caption>
                <Divider />
                <View style={{ borderTopWidth: 1, borderColor:'#6D0BD4', width: '100%', alignItems: 'center', }}>
                    <Text style={{
                        fontSize: 15, fontWeight: 'bold', marginBottom: '2%', marginTop: '2%', color:'#6D0BD4'
                }}>Built by</Text>
                    <Chip style={{ marginBottom: '4%' }} mode="outlined" textStyle={{ fontSize: 18, fontWeight: 'bold', color: '#6D0BD4' }}>wwt.co</Chip>
                    <Text style={{ fontSize: 17, color:'#6D0BD4' }}>https://wwt.co</Text>
                <Button title="Visit us"
                        icon={
                            
                                <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./globe-grid.png')} />
 

                        // <Ionicons name="md-globe" />
                    }
                    onPress={() => Linking.openURL("https://wwt.co")}
                        titleStyle={{ color: '#6D0BD4' }} type="clear" rounded />
                </View>
            </View>
           
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
