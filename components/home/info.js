import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';

import styles from './info.styles.js';

const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');

export default function Info(props) {

    const [foreman, setForeman] = useState('');
    const [siteName, setSiteName] = useState('');
    const [ssoName, setSsoName] = useState('');

    useEffect(() => {
        dataBase.ref('/sites/' + props.currentSite).on('value', snapshot => {
            setForeman(snapshot.val().foremanName);
            setSsoName(snapshot.val().safetyOfficerName);
            setSiteName(snapshot.val().site_name);
        });
    })

    return (
        <View style={styles.container}>
            <View style={styles.numSection}>
                <Text style={styles.head1}>{props.currentSite}</Text>
            </View>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>{siteName}</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head2}>Foreman</Text>
                </View>
                <View styles={styles.right}>
                    <Text style={styles.resp2}>{foreman}</Text>
                </View> 
            </View>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head2}>SSO</Text>
                </View>
                <View styles={styles.right}>
                    <Text style={styles.resp2}>{ssoName}</Text>
                </View> 
            </View>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head2}>Section</Text>
                </View>
                <View styles={styles.right}>
                    <Text style={styles.resp2}>5A</Text>
                </View>
            </View>
        </View>
    )
}