import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    uploadButton: {
        backgroundColor: '#b5dcfd',
        height: 45,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadButtonText: {
        color: 'white',
    },
    sendButton: {
        backgroundColor: '#4888c6',
        height: 60,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
})