import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal } from 'react-native';
import SOS from './sos.js'
import Report from './report.js';
import Info from './info.js';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';

import styles from './home.styles.js';

export default function Home({ navigation }) {

    const [currentSite, setCurrentSite] = useState(null);
    const [siteCode, setSiteCode] = useState('');

    const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    const userId = auth().currentUser.uid;

    const checkIn = () => {
        dataBase.ref('/users/' + userId).update({current_site: siteCode})
        dataBase.ref(`/sites/${siteCode}/${userId}/`).set(true).then(() => console.log('success'))
    }

    const signOutFn = () => {
        moveSite()
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      }

    const moveSite = () => {
        dataBase.ref(`/sites/${siteCode}/${userId}/`).set(false).then(() => console.log('success'));
        dataBase.ref('/users/' + userId).update({current_site: null});
    }

    useEffect(() => {
        dataBase.ref('/users/' + userId).on('value', snapshot => setCurrentSite(snapshot.val().current_site));
        console.log(currentSite)
    });

    if ( currentSite == null || currentSite == undefined ) {
        return (
            <SafeAreaView style={styles.nullContainer}>
                <Text style={styles.regText}>Enter the code for your site</Text>
                <TextInput style={styles.textInput} value={siteCode} onChangeText={setSiteCode}/>
                <TouchableOpacity style={styles.regButton} onPress={checkIn}><Text style={styles.regButtonText}>Check In</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 10}]} title="signout" onPress={signOutFn}><Text style={styles.text}>Sign Out</Text></TouchableOpacity>
            </SafeAreaView>
        )
    }
    else {

        return (
            <SafeAreaView style={styles.safe}>
                <View style={{flex: 1,}}>
                    <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20}} scrollEnabled={true} style={styles.container}>
                        <SOS/>
                        <Info currentSite={currentSite}/>
                        <Report fault="a fault" location="Report a Fault"/>
                        <Report fault="an injury" link="https://forms.gle/F4o79oxs2zcHko9K7"/>
                        <Report fault="broken equipment" link="https://forms.gle/jY1ZDwgdg7mSTTuZ6"/>
                        <TouchableOpacity style={styles.button} title="signout" onPress={moveSite}><Text style={styles.text}>Enter New Site Code</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} title="signout" onPress={signOutFn}><Text style={styles.text}>Sign Out</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
            )
    }
}