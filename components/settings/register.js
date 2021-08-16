import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import CheckBox from '@react-native-community/checkbox';

import styles from './register.styles.js';

const counties = ['Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Derry', 'Donegal', 'Down', 'Dublin', 'Fermanagh', 
    'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 
    'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Tyrone', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow']

export default function Register({ navigation }) {

    const [selectedCounty, setCounty] = useState('Antrim');
    const [siteName, setSiteName] = useState('');
    const [safetyOfficer, setSafetyOfficer] = useState('');
    const [safetyOfficerToken, setSafetyOfficerToken] = useState('');
    const [soNumber, setSoNumber] = useState('');
    const [fmNumber, setFmNumber] = useState('');
    const [name, setName] = useState('');
    const [foremanToken, setForemanToken] = useState('');
    const [company, setCompany] = useState('');
    const [customCode, setCustomCode] = useState('');

    const [inputEnable, setInputEnable] = useState(false);

    const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    const userId = auth().currentUser.uid;

    useEffect(() => {
        dataBase.ref('/users/' + userId).once('value').then(snapshot => {
            setName(snapshot.val().name);
            setForemanToken(snapshot.val().notif_token);
        });
    })

    const handleButtonPress = () => {
        if (inputEnable) {
            dataBase.ref(`/sites/${company}-${customCode}/`).update({
                site_name: siteName,
                safetyOfficerName: safetyOfficer,
                soNumber: soNumber,
                fmNumber: fmNumber,
                county: selectedCounty,
                foremanName: name,
                foremanToken: foremanToken,
            })
            .then(() => console.log('Data updated.'))
            .catch((error) => console.log(error));
            dataBase.ref('/users/' + userId).update({foreman_site: `${company}-${customCode}`}).then(() => console.log('Data updated.'))
            .catch((error) => console.log(error));
            navigation.navigate('Foreman');
        } else {
            const newRef = dataBase.ref('/sites').push()
            //console.log(newRef.key)
            newRef.update({
                site_name: siteName,
                safetyOfficerName: safetyOfficer,
                soNumber: soNumber,
                fmNumber: fmNumber,
                county: selectedCounty,
                foremanName: name,
                foremanToken: foremanToken,
            }).then(() => console.log('Data updated.'))
            .catch((error) => console.log(error));
            dataBase.ref('/users/' + userId).update({foreman_site: newRef.key}).then(() => console.log('Data updated.'))
            .catch((error) => console.log(error));
            navigation.navigate('Foreman');
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20,}} scrollEnabled={true} style={styles.safeContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Site Name</Text>
                    <TextInput style={styles.textInput} onChangeText={setSiteName} value={siteName} placeholder='Site Name' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Safety Officer Name</Text>
                    <TextInput style={styles.textInput} onChangeText={setSafetyOfficer} value={safetyOfficer} placeholder='Safety Officer' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Safety Officer User Token</Text>
                    <TextInput style={styles.textInput} onChangeText={setSafetyOfficerToken} value={safetyOfficerToken} placeholder='Safety Officer' />
                    <Text style={[styles.inputText, {fontStyle: 'italic'}]}>Safety Officers can share this code with 
                    you using the 'share' button at the bottom of the Home Menu</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Safety Officer Phone Number</Text>
                    <TextInput style={styles.textInput} onChangeText={setSoNumber} value={soNumber} placeholder='e.g. +353841234567' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Your Phone Number</Text>
                    <TextInput style={styles.textInput} onChangeText={setFmNumber} value={fmNumber} placeholder='e.g. +353841234567' />
                </View>
                <View style={styles.checkContainer}>
                    <Text style={{fontSize: 18}}>Use Custom Code?</Text>
                    <CheckBox
                        disabled={false}
                        value={inputEnable}
                        onValueChange={(newValue) => setInputEnable(newValue)}
                        style={{flex:1}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>You can use a custom code if your site uses an existing internal site code. It will use your
                    company's name and the internal code to generate a code like 'sisk-123456'. Otherwise we'll generate a code for you.</Text>
                </View>
                <View style={[styles.inputContainer,]}>
                    <Text style={styles.inputText}>Company Name</Text>
                    <TextInput style={[styles.textInput, {backgroundColor: inputEnable ? '#fafafa' : '#d6d6d6'}]} editable={inputEnable} onChangeText={setCompany} value={company} placeholder='e.g. sisk' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Custom Site Code</Text>
                    <TextInput style={[styles.textInput, {backgroundColor: inputEnable ? '#fafafa' : '#d6d6d6'}]} editable={inputEnable} onChangeText={setCustomCode} value={customCode} placeholder='e.g. 123456' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>County</Text>
                    <Picker
                        selectedValue={selectedCounty}
                        onValueChange={(itemValue, itemIndex) =>
                            setCounty(itemValue)
                        }>
                        {counties.map( ( county, i ) => {
                            return <Picker.Item key={i} label={county} value={county} />
                        })}
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}