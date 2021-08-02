import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import SOS from './sos.js'
import Report from './report.js';
import Info from './info.js';
import auth, { firebase } from '@react-native-firebase/auth';

import styles from './home.styles.js';

export default function Home() {

    const signOutFn = () => {
        auth()
      .signOut()
      .then(() => console.log('User signed out!'));
      }

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