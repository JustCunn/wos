import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';

import styles from './report.styles.js';

export default function Report(props) {
    return (
        <TouchableOpacity style={styles.touch} onPress={() => {Linking.openURL(props.link)}}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    Report {props.fault}
                </Text>
            </View>
        </TouchableOpacity>
    )
}