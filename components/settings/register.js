import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import styles from './register.styles.js';

const counties = ['Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Derry', 'Donegal', 'Down', 'Dublin', 'Fermanagh', 
    'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 
    'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Tyrone', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow']

export default function Register({ navigation }) {

    const [selectedCounty, setCounty] = useState('Antrim');
    const [siteName, setSiteName] = useState('');
    const [safetyOfficer, setSafetyOfficer] = useState('');
    const [soNumber, setSoNumber] = useState('');
    const [fmNumber, setFmNumber] = useState('');
    const [name, setName] = useState('');

    const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    const userId = auth().currentUser.uid;

    useEffect(() => {
        dataBase.ref('/users/' + userId).once('value').then(snapshot => setName(snapshot.val().name));
        console.log(name)
    })

    const handleButtonPress = () => {
        const newRef = dataBase.ref('/sites').push()
        //console.log(newRef.key)
        newRef.update({
            site_name: siteName,
            safetyOfficerName: safetyOfficer,
            soNumber: soNumber,
            fmNumber: fmNumber,
            county: selectedCounty,
            foremanName: name
        }).then(() => console.log('Data updated.'))
        .catch((error) => console.log(error));
        dataBase.ref('/users/' + userId).update({foreman_site: newRef.key}).then(() => console.log('Data updated.'))
        .catch((error) => console.log(error));
        navigation.navigate('Foreman');
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
                    <Text style={styles.inputText}>Safety Officer Phone Number</Text>
                    <TextInput style={styles.textInput} onChangeText={setSoNumber} value={soNumber} placeholder='e.g. +353841234567' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Your Phone Number</Text>
                    <TextInput style={styles.textInput} onChangeText={setFmNumber} value={fmNumber} placeholder='e.g. +353841234567' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>County</Text>
                    <Picker
                        selectedValue={selectedCounty}
                        onValueChange={(itemValue, itemIndex) =>
                            setCounty(itemValue)
                        }>
                        {counties.map(county => {
                            return <Picker.Item label={county} value={county} />
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