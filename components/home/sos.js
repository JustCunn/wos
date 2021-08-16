import React, { useState, useEffect } from 'react';
import styles from './sos.styles.js';
import { Text, View, TouchableOpacity, NativeModules, Linking, PermissionsAndroid } from 'react-native';
import { LocalNotification } from '../../services/LocalPushController.js';
import GLOBAL from '../../global.js';
import GetLocation from 'react-native-get-location'
import { is } from 'bluebird';
import { set } from 'react-native-reanimated';

let timeout = null;

const Countdown = (props) => {
    const [number, setNumber] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            var num = number
            setNumber(num - 1)
        }, 1000);
        if (number === 0) {
            props.setNotify(true);
            setTimeout(() => {
                props.setVisible(false)
            }, 500);
        }
    })

    return (
    <View style={[styles.countdownContainer,]}>
        <Text style={styles.countdownNumber}>{number}</Text>
        <TouchableOpacity style={styles.countdownButton} onPress={() => props.setVisible(false)}>
            <Text style={styles.countdownCancel}>Cancel</Text>
        </TouchableOpacity>
    </View>
    )
}

export default function SOS(props) {
    const [isVisible, setVisible] = useState(false);
    const [notify, setNotify] = useState(false);

    const pressHandler = async () => {
        //LocalNotification();
        setVisible(!isVisible)

        setTimeout(async () => {
            if (notify === true ) {
                console.log(notify)
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
                console.log(response);
            }
        }, 13000);
        setNotify(false);
        clearInterval()
    }

    return (
        <>
        {isVisible ? <Countdown isVisible={isVisible} setVisible={setVisible} setNotify={setNotify}/> : null}
        <TouchableOpacity onPress={() => pressHandler()} style={styles.touch} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>SOS</Text>
            </View>
        </TouchableOpacity>
        </>
        )
}