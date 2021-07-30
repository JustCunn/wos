import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './nav.styles.js';

export default function Nav() {
    const [homeActive, setHomeActive] = useState(true);
    const [settingsActive, setSettingsActive] = useState(false);
    const [helpActive, setHelpActive] = useState(false);

    const setActive = (item) => {
        item(true)
    }
    
    return (
        <View style={styles.wrapper}>
            <View style={[styles.item, homeActive ? styles.activeitem : null]}><Text>Home</Text></View>
            <View style={[styles.item, settingsActive ? styles.activeitem : null]}><Text>Settings</Text></View>
            <View style={[styles.item, helpActive ? styles.activeitem : null]}><Text>Help</Text></View>
        </View>
    )
}