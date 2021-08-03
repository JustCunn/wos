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
        width: '95%',
        margin: 10,
        backgroundColor: 'blue',
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    text: {
        color: 'white'
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
        width: '70%'
    },
})