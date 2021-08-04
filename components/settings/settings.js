import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import styles from './settings.styles.js';

export default function Settings({ navigation }) {

    const [fSite, setFSite] = useState(null)

    const database = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    const userId = auth().currentUser.uid;

    useEffect(() => {
        database.ref('/users/' + userId).on('value', snapshot => setFSite(snapshot.val().foreman_site));
        
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
            <View>
                <Text>{fSite}</Text>
            </View>
        )
    }
}