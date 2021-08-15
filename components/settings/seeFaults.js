import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, Image, Pressable } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { connect } from 'react-redux';
import Measure from '../../Measure.js';

import styles from './seeFaults.styles.js';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

export const FaultItem = (props) => {
    const [modalVisible, setModalVisible] = useState(null);

    return (<>
            <FaultModal modalVisible={modalVisible} setModalVisible={setModalVisible} text={props.fault_desc}
            images={props.images}/>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                <Text numberOfLines={1} style={styles.faultTitle}>{props.fault_desc}</Text>
                <View style={styles.faultInfo}>
                    <Text style={styles.faultTypeText}>{props.type}</Text>
                    <Text>{props.date}</Text>
                </View>
            </TouchableOpacity>
            </>
            )
}

export const ImageModal = (props) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            props.setModalVisible(!props.modalVisible);
            }}>
                <View style={styles.backgroundModal}>
                    <Image source={{uri: props.uri}} style={{height: 250, width: 350,}} />
                    <TouchableOpacity style={styles.modalClose} onPress={() => props.setModalVisible(!props.modalVisible)}>
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
        </Modal> 
    )
}

export const FaultModal = (props) => {
    const [imageModalVisible, setImageModalVisible] = useState(null);

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            props.setModalVisible(!props.modalVisible);
            }}>
            <View style={styles.backgroundModal}>
                <View style={styles.modalView}>
                    <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}
                    style={styles.modalScrollView}>
                        <Text style={styles.descText}>{props.text}</Text>
                    </ScrollView>
                    {props.images.map((item, i) => {
                        const [value, setValue] = useState(false);
                        return (
                            <>
                            <ImageModal modalVisible={imageModalVisible} setModalVisible={setImageModalVisible} uri={item} />
                            <Pressable key={i} onPress={() => setImageModalVisible(!imageModalVisible)}>
                                <Image style={{height: value ? 200 : 100, width: 100,}}
                                key={i} source={{uri: String(item)}}/>
                            </Pressable>
                            </>
                        )
                    })}
                    {/*<Image source={{uri: props.}} 
                    style={{height: 50, width: 50,}}/>*/}
                    <TouchableOpacity style={styles.modalClose} onPress={() => props.setModalVisible(!props.modalVisible)}>
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default function SeeFaults() {

    //const [faults, setFaults] = useState(null);
    const [foremanSite, setForemanSite] = useState(null);
    const [rows, setRows] = useState([]);
    const [imageSet, setImageSet] = useState([]);

    useEffect(async () => {
        const userId = auth().currentUser.uid;
        const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
        await dataBase.ref(`/users/${userId}/`).once('value').then(snapshot => setForemanSite(snapshot.val().foreman_site));
        await dataBase.ref(`/sites/${foremanSite}/faults`).once('value').then( async (snapshot) => {
            getFaults(snapshot.val())
        });
    }, [getFaults])

    /*useEffect(async () => {
        const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
        await dataBase.ref(`/sites/${foremanSite}/faults`).once('value').then(snapshot => {
            getFaults(snapshot.val());
        });
    }, [])*/

    async function getFaults(faults) {
        var data = []
        var image_temp_set = []
        for (const i in faults) {
            //setImageSet([])
            image_temp_set = []
            for (const img in faults[i].images) {
                if (faults[i].images[img] === undefined) {
                    continue
                }
                else {
                    const url = await storage().ref(faults[i].images[img]).getDownloadURL();
                    image_temp_set.push(url)
                }
            }
            data.push({
                fault_desc: faults[i].fault_description,
                owner: faults[i].owner,
                date: faults[i].date,
                type: faults[i].fault_type,
                images_uri: image_temp_set,
            });
        }
        setRows(data);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 50}}
            style={{width:'100%',}}>
                {rows.map( (item, i) => {return <FaultItem key={i} fault_desc={item.fault_desc} 
                owner={item.owner} date={item.date} type={item.type} images={item.images_uri}/> })}
            </ScrollView>
        </SafeAreaView>
    )
}