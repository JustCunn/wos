import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import database, { firebase } from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

import styles from './reportFault.styles.js';

export default function ReportFault() {

    const [fault, setFault] = useState("")
    const [image, setImage] = useState(null)
    const [currentSite, setCurrentSite] = useState('')
    const faultType = 'Site Fault'
    const navigation = useNavigation();

    const onButtonPress = React.useCallback(() => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, setImage);
      }, []);

    const onSend = async () => {
        const today = new Date();
        console.log(today)
        const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
        const userId = auth().currentUser.uid;
        await dataBase.ref('/users/' + userId).on('value', snapshot => setCurrentSite(snapshot.val().curren_site))
        dataBase.ref(`/sites/${currentSite}/faults/`).push().set({
            fault_type: faultType,
            user: userId,
            time_date: today,
            fault_description: fault
        });
        navigation.navigate('Home')
    }

    /*const showImage = () => {
        if (image !== null) {
        }
    }*/

    useEffect(() => {
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1,}}>
                <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20,}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>Description of the fault</Text>
                            <TextInput style={styles.textInput} onChangeText={setFault} 
                            multiline={true} numberOfLines={5} value={fault} placeholder='Describe the fault' />
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity onPress={onButtonPress} style={styles.uploadButton}>
                                <Text style={styles.uploadButtonText}>Upload an image</Text>
                            </TouchableOpacity>
                            <ScrollView horizontal={true}>
                            {image?.assets.map(({uri}) => (
                                <View key={uri} style={{margin: 5}}>
                                    <Image source={{uri: uri}} style={{width: 100, height: 100}}/>
                                </View>
                            ))}
                            </ScrollView>
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                                <Text style={styles.uploadButtonText}>Send Report</Text>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}