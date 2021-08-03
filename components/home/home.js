import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal } from 'react-native';
import SOS from './sos.js'
import Report from './report.js';
import Info from './info.js';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';
import GLOBAL from '../global.js';

import styles from './home.styles.js';

export default function Home({ navigation }) {

    //const [currentSite, setCurrentSite] = useState(null);
    const [siteCode, setSiteCode] = useState('');
    const [foreman, setForeman] = useState('');

    const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    const userId = auth().currentUser.uid;

    const checkIn = () => {
        dataBase.ref('/sites/' + siteCode).on('value', snapshot => setForeman(snapshot.val().safetyOfficer));
        dataBase.ref('/users/' + userId).update({current_site: siteCode})
        dataBase.ref('/sites/' + siteCode).on('value', snapshot => {
            GLOBAL.foreman = snapshot.val().foremanName;
            GLOBAL.sso = snapshot.val().safetyOfficerName;
            GLOBAL.siteName = snapshot.val().site_name
        });
    }

    const signOutFn = async () => {
        await dataBase.ref('/users/' + userId).update({current_site: null});
        GLOBAL.currentSite = null
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      }

    useEffect(() => {
        console.log(GLOBAL.currentSite)
        dataBase.ref('/users/' + userId).on('value', snapshot => GLOBAL.currentSite = snapshot.val().current_site);
    });

    if ( GLOBAL.currentSite == null || GLOBAL.currentSite == undefined ) {
        return (
            <SafeAreaView style={styles.nullContainer}>
                <Text style={styles.regText}>Enter the code for your site</Text>
                <TextInput style={styles.textInput} value={siteCode} onChangeText={setSiteCode}/>
                <TouchableOpacity style={styles.regButton} onPress={checkIn}><Text style={styles.regButtonText}>Check In</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} title="signout" onPress={signOutFn}><Text style={styles.text}>Sign Out</Text></TouchableOpacity>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={{flex: 1,}}>
                    <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20}} scrollEnabled={true} style={styles.container}>
                        <SOS/>
                        <Info/>
                        <Report fault="a fault" location="Report a Fault"/>
                        <Report fault="an injury" link="https://forms.gle/F4o79oxs2zcHko9K7"/>
                        <Report fault="broken equipment" link="https://forms.gle/jY1ZDwgdg7mSTTuZ6"/>
                        <TouchableOpacity style={styles.button} title="signout" onPress={signOutFn}><Text style={styles.text}>Sign Out</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
            )
    }
}