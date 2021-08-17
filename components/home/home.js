import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { setLol, setData, store } from '../../store.js';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Share, Linking } from 'react-native';
import SOS from './sos.js'
import Report from './report.js';
import Info from './info.js';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import GLOBAL from '../../global.js';

import styles from './home.styles.js';
import Measure from '../../Measure.js';
import ServiceOn from './serviceOn.js';

const stopMeasureService = () => {
    Measure.stopService();
    setTimeout(() => {
        store.dispatch(setLol(false));
    }, 1000);
}

const startMeasureService = () => {
    Measure.startService();
    store.dispatch(setLol(true));
}

const Home = ({ lol }) => {

    const [currentSite, setCurrentSite] = useState(null);
    const [siteCode, setSiteCode] = useState('');
    const [userId, setUserId] = useState(null);
    
    const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    
    const navigation = useNavigation();

  //const lol = useSelector((state) => state.App.lol);

    //Check users in
    const checkIn = async () => {
        dataBase.ref('/users/' + userId).update({current_site: siteCode})
        dataBase.ref(`/sites/${siteCode}/workers/${userId}/`).set(true).then(() => console.log('success'))
        const currentSiteTemp = await dataBase.ref('/users/' + userId).once('value')
                                .then(snapshot => { return snapshot.val().current_site});
        setCurrentSite(currentSiteTemp);
    }

    //Signs User Out of Firebase Auth
    const signOutFn = async () => {
        moveSite().then(auth().signOut().then(() => console.log('User signed out!')));
      }

    const moveSite = async () => {
        dataBase.ref(`/sites/${currentSite}/workers/${userId}/`).set(false).then(() => console.log('success'));
        dataBase.ref('/users/' + userId).update({current_site: null});
        setCurrentSite(null);
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `${GLOBAL.notifyId}`,
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

    //Checks if user is associated with a site already
    useEffect(async () => {
        const userId = await auth().currentUser.uid;
        const currentSiteTemp = await dataBase.ref('/users/' + userId).once('value')
                                .then(snapshot => { return snapshot.val().current_site});

        dataBase.ref(`/sites/${currentSiteTemp}/`).once('value').then(snapshot => {
            GLOBAL.foremanRegToken = snapshot.val().foremanToken
        });

        dataBase.ref(`/users/${userId}/`).once('value').then(snapshot => {
            if ( snapshot.val().foreman_site !== undefined | null ) {
                dataBase.ref(`/sites/${snapshot.val().foreman_site}/`).update({foremanToken: GLOBAL.notifyId});
            }
        });
        console.log(currentSiteTemp)
        setCurrentSite(currentSiteTemp);
        setUserId(userId);
    });

    if ( currentSite == null || currentSite == undefined ) {
        return (
            <SafeAreaView style={styles.nullContainer}>
                <Text style={styles.regText}>Enter the code for your site</Text>
                <View style={styles.regInputView}>
                    <TextInput style={styles.textInput} value={siteCode} onChangeText={setSiteCode}/>
                    <TouchableOpacity style={styles.regButton} onPress={checkIn}>
                        <Text style={styles.regButtonText}>➜</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 10}]} title="signout" onPress={signOutFn}>
                    <Text style={styles.text}>Sign Out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    else {

        return (
            <SafeAreaView style={styles.safe}>
                <View style={{flex: 1,}}>
                    <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 15}} scrollEnabled={true} style={styles.container}>
                        <SOS/>
                        <Info currentSite={currentSite}/>

                        <TouchableOpacity style={styles.button1} 
                            onPress={() => {
                                lol ? stopMeasureService() : startMeasureService()
                            }}>
                            <Text style={styles.text1}>{lol ? 'Stop' : 'Start'} Fall Detection</Text>
                        </TouchableOpacity>
                        <View style={{marginBottom: 5}}>
                            <Text>Make sure your LOCATION is turned ON</Text>
                        </View>
                        {lol ? <ServiceOn /> : null}

                        <Report fault="a fault" location="Report a Fault"/>
                        <View style={styles.homeSettingsView}>
                            <Text style={styles.homeSettingsText}>Settings</Text>
                            <View style={styles.homeSettingsLine} />
                        </View>
                        <TouchableOpacity style={styles.button2} title="signout" onPress={() => moveSite()}>
                            <Text style={styles.text2}>Enter New Site Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} title="signout" onPress={signOutFn}>
                            <Text style={styles.text2}>Sign Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} title="ppolicy" onPress={() => Linking.openURL('https://www.watchoutsafety.com/#testimonials')}>
                            <Text style={styles.text2}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} title="share" onPress={onShare}>
                            <Text style={styles.text2}>Share User Token</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
            )
    }
}

const mapStateToProps = store => ({
    lol: store.App.lol,
    data: store.App.data,
});

export default connect(mapStateToProps)(Home);