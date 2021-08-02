import React from 'react';
import styles from './sos.styles.js';
import { Text, View, TouchableOpacity, NativeModules, Linking, PermissionsAndroid } from 'react-native';
import { LocalNotification } from '../../services/LocalPushController.js';

export default function SOS(props) {
    const pressHandler = () => {
        LocalNotification();
    }

    return (
        <TouchableOpacity onPress={pressHandler} style={styles.touch} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>SOS</Text>
            </View>
        </TouchableOpacity>
    )
}