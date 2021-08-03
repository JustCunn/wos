import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import styles from './reportFault.styles.js';

export default function ReportFault() {

    const [fault, setFault] = useState("")
    const [image, setImage] = useState(null)

    const onButtonPress = React.useCallback(() => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, setImage);
      }, []);

    /*const showImage = () => {
        if (image !== null) {
        }
    }*/

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
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}