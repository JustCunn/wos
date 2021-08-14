import React from 'react';
import styles from './sos.styles.js';
import { Text, View, TouchableOpacity, NativeModules, Linking, PermissionsAndroid } from 'react-native';
import { LocalNotification } from '../../services/LocalPushController.js';
import GLOBAL from '../../global.js';
import GetLocation from 'react-native-get-location'

export default function SOS(props) {
    const pressHandler = async () => {
        //LocalNotification();
        const loc = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {return location})
        console.log(loc);
        const response = await fetch(
            `https://watchout-flask.herokuapp.com/sos_notify/${GLOBAL.foremanRegToken},${loc.latitude},${loc.longitude}`,
            {
            method: 'GET',
            /*headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "reg_token": GLOBAL.foremanRegToken
            }*/
    }
            )
        console.log(response)
    }

    return (
        <TouchableOpacity onPress={pressHandler} style={styles.touch} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>SOS</Text>
            </View>
        </TouchableOpacity>
    )
}