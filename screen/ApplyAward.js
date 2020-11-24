import React from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl, ScrollView, Alert, Image, TouchableOpacity, Linking } from 'react-native';
import firebase from "../firebase/firebase";

import { Header, ListItem,Icon, Card, CardItem, Button, PricingCard } from 'react-native-elements'
import { AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../store/actions'
import { editUser } from '../store/actions'
import DeleteItem from './DataRepository/DeleteItem';
import UpdateItem from './DataRepository/UpdateItem';
import GetDataById from './DataRepository/GetDataById';
import AddNewItem from './DataRepository/AddNewItem';
import GetAllSnapshot from './DataRepository/GetAllSnapshot';

import { Caption, Chip, Divider } from 'react-native-paper';
import axios from 'axios';




export default function AppyAward({ route, navigation: { goBack } }) {

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

    var pres;
    const uid = useSelector(state => state.uid)

    const docid = useSelector(state => state.docid)
    const email = useSelector(state => state.email)
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



    var setAppliedFName
    var setAppliedLName
    var setAppliedCountry
    var setAppliedEmail
    var setAppliedGPA
    var setAppliedAddress
    var setAppliedAHI
    var setAppliedCity
    var setAppliedC1
    var setAppliedC2
    var setAppliedC3
    var setAppliedETH
    var setAppliedGender
    var setAppliedState
    var setAppliedZip
    var setAppliedAwardType
    var setAppliedTitle
    var setAppliedDesc
    var setAppliedGPAf
    var setAppliedGPAt
    var awardprovince
    var voa
    var pos
    var colluni
    var colluniname
    var url
    var phone
    var setAppliedAgender
    var setAppliedAeth
    var setAppliedpos
 

    var poos
    var obj = [];


    function ApplyForAward(id) {
        setApplying(false)
        setMailsend(true)

        var mybody = "";
        const newLink = {
            uid: uid.replace(/['"]+/g, ''),
            email: email.replace(/['"]+/g, ''),
            docid: docid.replace(/['"]+/g, ''),
            awardid: id,
            created: Date.now()
        };
        const user12 = AddNewItem("StudentAwards", newLink)
        const linkRef = GetDataById("Addawards",id)
        linkRef.get().then(doc => {
            setAppliedTitle = doc.data().title
            setAppliedDesc = doc.data().description
            setAppliedGPAf = doc.data().GPAFrom
            setAppliedGPAt = doc.data().GPATo
            setAppliedAwardType = doc.data().awardtype
            setAppliedAgender = doc.data().gender
            setAppliedAeth = doc.data().Ethnicity
           
            awardprovince = doc.data().province
            voa = '$' + doc.data().voa
            pos = doc.data().pos
            url = doc.data().url


            const linkRef2 = GetDataById("users", docid.replace(/['"]+/g, '')) 
            linkRef2.get().then(doc => {

                setAppliedFName = doc.data().fname

                setAppliedLName = doc.data().lname
                setAppliedCountry = doc.data().country
                setAppliedEmail = doc.data().email
                setAppliedGPA = doc.data().SignUpStep.GPA
                setAppliedAddress = doc.data().SignUpStep.address
                setAppliedAHI = doc.data().SignUpStep.ahi
                setAppliedCity = doc.data().SignUpStep.city

                setAppliedETH = doc.data().SignUpStep.eth
                setAppliedGender = doc.data().SignUpStep.gender
                setAppliedState = doc.data().SignUpStep.state
                setAppliedZip = doc.data().SignUpStep.zip
                setAppliedpos = doc.data().SignUpStep.field_of_study
                phone = doc.data().phone
                colluniname = doc.data().SignUpStep.educational_institution_name
                colluni = doc.data().SignUpStep.educational_institution
                if (colluni == 1 || colluni == "1") {
                    colluni = "University";
                } else {
                    colluni = "College"
                }

          


                axios.post('https://us-central1-flip-27408.cloudfunctions.net/sendMail', null, {
                    params: {
                        dest: "admin@theflipapp.ca",
                        setAppliedFName: setAppliedFName,
                        setAppliedLName: setAppliedLName,
                        setAppliedCountry: setAppliedCountry,
                        setAppliedEmail: setAppliedEmail,
                        setAppliedGPA: setAppliedGPA,
                        setAppliedAddress: setAppliedAddress,
                        setAppliedAHI: setAppliedAHI,
                        setAppliedCity: setAppliedCity,
                        setAppliedETH: setAppliedETH,
                        setAppliedGender: setAppliedGender,
                        setAppliedState: setAppliedState,
                        setAppliedZip: setAppliedZip,
                        setAppliedAgender: setAppliedAgender,
                        setAppliedAeth: setAppliedAeth,
                        setAppliedpos: setAppliedpos,
                        phone: phone,
                        colluniname: colluniname,
                        colluni: colluni,
                        setAppliedTitle: setAppliedTitle,
                        setAppliedDesc: setAppliedDesc,
                        setAppliedGPAf: setAppliedGPAf,
                        setAppliedGPAt: setAppliedGPAt,
                        setAppliedAwardType: setAppliedAwardType,
                        awardprovince: awardprovince,
                        voa: voa,
                        pos: pos,
                        state: " ",
                        url: url

                    }
                })
                    .then(function (response) {
                        setMailsend(false)
                        alert("Successfully applied!");
                        goBack()
                    })
                    .catch(function (error) {
                        alert(error);
                    });


            })
        })

        setTimeout(function () { setApplying(true) }, 3000)

    }

    function button(id) {

        Alert.alert(
            'Apply For Award',
            'Are you sure you want to proceed?',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => ApplyForAward(id) },
            ]
        );
    }
    var [loading, setLoading] = React.useState(null);
    var tit;
    var de;

    var [iscon1, setIscon1] = React.useState(null);
    var [isload, setIsload] = React.useState(false);
    var [already, setAlready] = React.useState(false);
    var [applying, setApplying] = React.useState(true);
    var [pressed, setPressed] = React.useState(null);

    var [ele, setElement] = React.useState(null);

    var [title, setTitle] = React.useState(null);
    var [voa, setVoa] = React.useState(null);
    var [pos, setPos] = React.useState(null);
    var [province, setProvince] = React.useState(null);
    var [url, setUrl] = React.useState(null);
    var [type, setType] = React.useState(null);
    var [desc, setDesc] = React.useState(null);
    var mygpa;
    console.log("iscon1-> ", iscon1)
    console.log("dsa")
    console.log(de)
    React.useEffect(() => {
        const { id } = route.params;
        goToView(id,"1")
     
    }, []);
 
    function goToView(id, flag) {
        pres = id;
        setPressed(id)
        setLoading(true)
        console.log("ingotoview")
        console.log(flag)


        const linkRef = GetDataById("Addawards",id) 
        linkRef.get().then(doc => {

            setTitle(doc.data().title)
            setDesc(doc.data().description)
            setVoa("$" + doc.data().voa)
            setPos(doc.data().pos)
            setProvince(doc.data().province)
            setUrl(doc.data().url)
            setType(doc.data().awardtype)
            poos = doc.data().pos


            setIscon1(true)







        })


        firebase.db.collection("StudentAwards").where("uid", "==", uid.replace(/['"]+/g, '')).onSnapshot(handleSnapshot__2);






        //here
    }

    function handleSnapshot__2(snapshot) {

        data = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        for (let userObject of data) {

            if (userObject.awardid == pres) {
                setAlready(true);

            }
        }

        // console.log(data.length);

        setIsload(true)
        // setLoading(false);
    }
    let [award, setAward] = React.useState([]);


 


    if (!isload || title == null) {
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
        return (<>
            <Header backgroundColor='#6D0BD4'
                leftComponent={
                    <TouchableOpacity onPress={() => (goBack())}>
                        <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./back.png')} />

                    </TouchableOpacity>
                }
                   centerComponent={{ text: 'FLIP', style: { color: '#fff' } }}
            />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

            >

               
                    <>

                        <Card style={{
                            flex: 1

                        }} title="Apply For Award"


                        >
                            <View >
                                {!mailsend ?
                                    !already ?
                                        <PricingCard
                                        color="#6D0BD4"
                                            title={title}
                                            price={voa}
                                            info={[desc, "Field of study:  " + pos, "Province/Territory:  " + province, "Award Type:  " + type]}
                                            button={{ title: 'APPLY NOW' }}
                                        onButtonPress={() => button(pressed)}
                                        butt
                                        />
                                        :

                                        <PricingCard
                                        color="#6D0BD4"
                                            title={title}
                                            price={voa}
                                            info={[desc, "Field of study:  " + pos, "Province/Territory:  " + province, "Award Type:  " + type]}

                                            button={{ title: 'ALREADY APPLIED' }}

                                        />
                                    : <PricingCard
                                    color="#6D0BD4"
                                        title={title}
                                        price={voa}
                                        info={[desc, "Field of study:  " + pos, "Province/Territory:  " + province, "Award Type:  " + type]}

                                        button={{ title: 'Applying...' }}

                                    />
                                }
                            </View >

                            <View style={{

                                flexDirection: 'row-reverse',
                                bottom: 0,
                                marginLeft: '4%'


                            }}>
                                <View style={{ width: '20%', marginLeft: '4%' }}>
                                    <Button
                                        onPress={() => Linking.openURL(url)}
                                        title=""
                                    icon={
                                       
                                            <Image style={{ width: 25, height: 25, marginTop: '6%' }} source={require('./globe-grid1.png')} />
 
                                         }
                                        backgroundColor='white'
                                        rounded
                                        type="outline"
                                    />
                                </View>
                                <View style={{
                                    width: '20%', textAlign: 'right'
                                }}>
                                    
                                </View>
                            </View>
                        </Card>

                        
                    </>
           
            </ScrollView>
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
