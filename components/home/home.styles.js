import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1
    },
    button: {
        width: '90%',
        margin: 10,
        backgroundColor: '#4788c6',
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    nullContainer: {
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
        fontSize: 24,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: '#fafafa',
        marginTop: 5,
        borderRadius: 7,
        borderWidth: 0.8,
        width: '70%',
        height: 40,
    },
})