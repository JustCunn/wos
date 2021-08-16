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
        margin: 5,
        backgroundColor: '#4788c6',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        /*shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,*/
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
        backgroundColor: 'radial-gradient(circle, rgba(71,135,198,1) 0%, rgba(182,219,253,1) 100%)',
        width: '15%',
        height: 50,
        borderRadius: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginRight: 10,
        //borderRadius: 7,
        borderBottomWidth: 0.8,
        width: '80%',
        height: 40,
        color: 'black'
    },
    regInputView: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        color: 'black'
    },
    homeSettingsView: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    homeSettingsText: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 1
    },
    homeSettingsLine: {
        height: 1,
        backgroundColor: 'black',
        flex: 2,
        marginTop: 7
    }
})