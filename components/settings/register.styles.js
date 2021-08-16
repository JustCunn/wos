import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingTop: 15,
        backgroundColor: 'white',
    },
    safeContainer: {
        width: '100%',
    },
    textInput: {
        backgroundColor: '#fafafa',
        marginTop: 5,
        //borderRadius: 7,
        borderBottomWidth: 0.8,
    },
    inputContainer: {
        width: '90%',
        margin: 10
    },
    inputText: {

    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#4788c6',
        width: '90%',
        height: 50,
        borderRadius: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    checkContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
})