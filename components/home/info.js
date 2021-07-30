import React from 'react';
import { Text, View } from 'react-native';

import styles from './info.styles.js';

export default function Info() {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head1}>Site No.</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.resp1}>891527</Text>
                </View>
            </View>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>New Children's Hospital</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head2}>Foreman</Text>
                </View>
                <View styles={styles.right}>
                    <Text style={styles.resp2}>Johnny Appleseed</Text>
                </View> 
            </View>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head2}>SSO</Text>
                </View>
                <View styles={styles.right}>
                    <Text style={styles.resp2}>Jane Doe</Text>
                </View> 
            </View>
            <View style={styles.section}>
                <View style={styles.left}>
                    <Text style={styles.head2}>Section</Text>
                </View>
                <View styles={styles.right}>
                    <Text style={styles.resp2}>5A</Text>
                </View>
            </View>
        </View>
    )
}