/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { setLol, setData, store } from './store';
import { connect } from 'react-redux';
import { accelerometer, setUpdateIntervalForType, SensorTypes, gravity, set, gyroscope} from 'react-native-sensors';
import { combineLatest } from "rxjs";
import { map, filter } from "rxjs/operators";
import GLOBAL from './global.js';
import PushNotification, {Importance} from 'react-native-push-notification';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import GetLocation from 'react-native-get-location'
import Measure from './Measure.js';

const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');

PushNotification.createChannel(
    {
      channelId: "channelid", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        setTimeout(() => {
            const current_user = auth().currentUser
            if (current_user !== null) {
                const uid = current_user.uid;
                dataBase.ref('/users/' + uid).update({notif_token: token.token}).then(() => console.log('Data updated.'))
                .catch((error) => console.log(error));
                GLOBAL.notifyId = token.token;
            }
        }, 2000);
    },
// (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
    console.log('REMOTE NOTIFICATION ==>', notification);
    console.log(notification.data.body)
    PushNotification.localNotification({
        channelId: 'channelid',
        title:notification.data.title,
        message:notification.data.body,
        soundName: 'default',
        playSound: true,
        importance: Importance.HIGH,
    });
    if (notification.foreground) {
        PushNotification.localNotification({
            channelId: 'channel-id',
            title:notification.data.title,
            message:notification.data.message,
            soundName: 'default',
            playSound: true,
            importance: Importance.HIGH,
        });
    }; 
// process the notification here
    },
    // Android only: GCM or FCM Sender ID
    senderID: '356649573685',
    popInitialNotification: true,
    requestPermissions: true,
    foreground: true,
})

const MyHeadlessTask = async () => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 20);
    setUpdateIntervalForType(SensorTypes.gravity, 20);
    setUpdateIntervalForType(SensorTypes.gyroscope, 20);

    const userAccelerationStream = combineLatest([accelerometer, gravity, gyroscope]).pipe(
        map(([accelerometerValue, gravityValue, gyroscopeValue]) => ({
          accelerometer: accelerometerValue,
          gravity: gravityValue,
          gyroscope: gyroscopeValue,
    })));

    const subscription = userAccelerationStream.subscribe(async event => {
        const acc = Math.sqrt((event.accelerometer.x - event.gravity.x)**2 +
                (event.accelerometer.y - event.gravity.y)**2 +
                (event.accelerometer.z - event.gravity.z)**2);
        if (GLOBAL.prevAcc > 3 && acc < 0.338) {
            setTimeout(async () => {
                console.log('Hello')
                const loc = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 200000,
                }).then(location => {return location})
                const response = await fetch(
                    `https://watchout-flask.herokuapp.com/sos_notify/${GLOBAL.foremanRegToken},${loc.latitude},${loc.longitude}`,
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    /*body: {
                        "reg_token": GLOBAL.foremanRegToken
                    }*/
                }
                    )
            }, 10000);
            Measure.stopService();
            store.dispatch(setLol(false));
        }
        console.log(acc)
        GLOBAL.prevAcc=acc;
        /*console.log(getDisplacement(GLOBAL.initialVel, 0.1, event.accelerometer.y - event.gravity.y))
        console.log(event.accelerometer.y - event.gravity.y)
        if (event.accelerometer.y - event.gravity.y > 5) {
            console.log("You're going too fast");
        }*/
        }
    );

    //console.log('Past:'+pastSpeed+' Current:'+GLOBAL.speed)
    setTimeout(() => {
        subscription.unsubscribe()
    }, 21)
};



const RNRedux = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

AppRegistry.registerHeadlessTask('Measure', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
