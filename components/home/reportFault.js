import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import database, { firebase } from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

import styles from './reportFault.styles.js';

const faults = ['Site Fault', 'Machinery Fault', 'Injury/Close call'];

export default function ReportFault() {

    const [fault, setFault] = useState("");
    const [image, setImage] = useState(null);
    const [currentSite, setCurrentSite] = useState(null);
    const [selectedFault, setSelectedFault] = useState('Site Fault')
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const navigation = useNavigation();
    const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
    const userId = auth().currentUser.uid;
    

    const handleImageRequest = React.useCallback(() => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, setImage);
      }, []);

    const onSend = async () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        if (image == null) {
            null
        }
        else {
            image.assets.map( async (item, i) => {
                const reference = storage().ref(item.fileName);
                await reference.putFile(item.uri);
            });
        }

        const dbRef = dataBase.ref(`/sites/${currentSite}/faults/`).push();
        const key = dbRef.key;
        console.log(day)
        await dbRef.set({
            fault_type: selectedFault,
            user: userId,
            date: `${day}/${month+1}/${year}`,
            fault_description: fault,
            resolved: toggleCheckBox ? 'Yes' : 'No'
        });

        if (image == null) {
            null
        }
        else {
            image.assets.map( (item, i) => {
                dataBase.ref(`/sites/${currentSite}/faults/${key}/images/`).push().set(item.fileName)
            })
        }
        navigation.navigate('Home')
    }

    /*const showImage = () => {
        if (image !== null) {
        }
    }*/

    useEffect(() => {
        dataBase.ref('/users/' + userId).on('value', snapshot => setCurrentSite(snapshot.val().current_site));
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1,}}>
                <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20,}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>Fault Type</Text>
                            <Picker
                                selectedValue={selectedFault}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedFault(itemValue)
                                }>
                                {faults.map( ( pickedFault, i ) => {
                                    return <Picker.Item key={i} label={pickedFault} value={pickedFault} />
                                })}
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>Description of the fault</Text>
                            <TextInput style={styles.textInput} onChangeText={setFault} 
                            multiline={true} numberOfLines={5} value={fault} placeholder='Describe the fault' />
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity onPress={handleImageRequest} style={styles.uploadButton}>
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
                        <View style={styles.checkContainer}>
                            <Text style={{fontSize: 18}}>Resolved?</Text>
                            <CheckBox
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                style={{flex:1}}
                            />
                            <Text style={{fontSize: 14, fontStyle: 'italic'}}>Tick for 'yes'</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity onPress={() => onSend()} style={styles.sendButton}>
                                <Text style={styles.uploadButtonText}>Send Report</Text>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}