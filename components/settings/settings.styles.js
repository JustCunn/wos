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
        backgroundColor: '#4788c6',
        width: '70%',
        height: 50,
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