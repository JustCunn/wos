import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Share } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import SeeFaults from './seeFaults.js'

import styles from './settings.styles.js';

export default function Settings({ navigation }) {

    const [fSite, setFSite] = useState(null);
    const [siteName, setSiteName] = useState(null)

    const database = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Your site code for ${siteName}'s WatchOut Safety room is ${fSite}.`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shareds
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    useEffect(async () => {
        const userId = await auth().currentUser.uid;
        console.log(userId)
        database.ref('/users/' + userId).on('value', snapshot => { 
          if ( snapshot.val().foreman_site === undefined | null) {
            null
          } else {
            database.ref('/sites/' + snapshot.val().foreman_site).on('value', snapshot => {
              setSiteName(snapshot.val().site_name)
            });
          }
          setFSite(snapshot.val().foreman_site);
         });
    })

    if (fSite === undefined) {
        return ( <View style={styles.container}>
                    <Text style={styles.regText}>You do not own a Site</Text>
                    <TouchableOpacity style={styles.regButton} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.regButtonText}>Register your site</Text>
                    </TouchableOpacity>
                </View> )
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 50}} 
                scrollEnabled={true} style={styles.scrollContainer}>
                    <Text style={{fontSize: 25, fontWeight: 'bold',}}>{fSite}</Text>
                    <TouchableOpacity style={styles.button2} title="signout" onPress={onShare}>
                        <Text style={styles.text2}>Share site code</Text>
                    </TouchableOpacity>
                    <View style={styles.homeSettingsView}>
                        <Text style={styles.homeSettingsText}>Faults</Text>
                        <View style={styles.homeSettingsLine} />
                    </View>
                    {/*<TouchableOpacity style={styles.button1} title="signout" onPress={() => navigation.navigate('Site Faults')}>
                        <Text style={styles.text1}>See your site faults</Text>
                    </TouchableOpacity>*/}
                    <SeeFaults />
                </ScrollView>
            </SafeAreaView>
        )
    }
}