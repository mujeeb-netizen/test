import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon, Header } from 'react-native-elements'


export default function Contact({ navigation}) {
     
    return (
        <>
            <Header
                // leftComponent={<Ionicons name="md-list" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
                centerComponent={{ text: 'The FlipApp', style: { color: '#fff' } }}
            />
            <View style={{ marginLeft: '10%', marginRight: '10%', padding: '5%', borderRadius: 30, alignItems: 'center', marginTop: '20%' }}>
                <Text style={{ fontSize: 20, fontWeight: '300', color: 'black' }}> Contact </Text>
            </View>
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
