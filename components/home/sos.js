import React from 'react';
import styles from './sos.styles.js';
import { Text, View, TouchableOpacity, NativeModules, Linking, PermissionsAndroid } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const phonenum = '0833625925'
var DirectSms = NativeModules.DirectSms;

export default function SOS(props) {

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: 'YourProject App Sms Permission',
                    message:
                    'YourProject App needs access to your inbox ' +
                    'so you can send messages in background.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                DirectSms.sendDirectSms('0833625925', 'Test React Native');
            } else {
                console.log('SMS permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <TouchableOpacity onPress={() => getPermissions()} style={styles.touch} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>SOS</Text>
            </View>
        </TouchableOpacity>
    )
}