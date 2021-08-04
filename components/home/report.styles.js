import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    touch: {
        width: '90%',
        height: 60,
        margin: 10
    },
    wrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderColor: '#e3e3e3',
        backgroundColor: '#f5f5f5',
        paddingLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    text: {
        fontSize: 20
    }
})