import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    scrollContainer: {
        width: '100%',
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
    },
    button1: {
        width: '90%',
        margin: 5,
        backgroundColor: '#4788c6',
        height: 200,
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
    text1: {
        color: 'white',
        fontSize: 16,
    },
    button2: {
        width: '90%',
        margin: 5,
        marginBottom: 30,
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
    text2: {
        color: 'white',
        fontSize: 20,
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
        flex: 2.5,
        marginTop: 7
    }
})