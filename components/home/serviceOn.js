import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet} from 'react-native';

export default function ServiceOn() {
    return (
        <View style={styles.container}>
            <View style={styles.indContainer}>
                <ActivityIndicator size='large' color='#03fc8c'/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Fall Detection Active</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: '#03fc8c',
        marginBottom: 5,
    },
    indContainer: {
        flex: 1,
    },
    textContainer: {
        flex: 6,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    text: {
        fontSize: 20,
        color: '#03fc8c'
    }
})