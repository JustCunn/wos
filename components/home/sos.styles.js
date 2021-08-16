import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        width: "100%",
        height: 200,
        backgroundColor: 'red',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 100,
        color: 'white'
    },
    touch: {
        //height: '30%',
        width: '90%',
        marginBottom: 15,
    },
    countdownContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownButton: {
        backgroundColor: 'white',
        width: '90%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    countdownNumber: {
        fontSize: 96,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    countdownCancel: {
        color: 'red',
        fontSize: 30
    }
})