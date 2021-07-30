import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#2640d4',
        position: 'absolute',
        bottom: '0',
        height: '3.5em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    item: {
        color: 'white',
    },
    activeitem: {
        fontWeight: 'bold'
    }
});