import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
    },
    regButton: {
        backgroundColor: '#e35959',
        width: '70%',
        height: '7%',
        borderRadius: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    regButtonText: {
        color: 'white',
        fontSize: 20,
    },
    regText: {
        fontSize: 28,
        fontWeight: 'bold'
    }
})