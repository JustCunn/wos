import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    touch: {
        width: '90%',
        height: 40,
        margin: 10
    },
    wrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        borderColor: '#e3e3e3',
        backgroundColor: '#4888c6',
        paddingLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        /*shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,*/
    },
    text: {
        fontSize: 16,
        color: 'white',
    }
})