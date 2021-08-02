import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './report.styles.js';

export default function Report(props) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate(props.location)}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    Report {props.fault}
                </Text>
            </View>
        </TouchableOpacity>
    )
}