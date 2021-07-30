import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column'
    },
    section: {
        display: 'flex',
        flexDirection: 'row'
    },
    left: {
        flex: 1
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    head1: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    resp1: {
        fontSize: 40
    },
    head2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    resp2: {
        fontSize: 20
    },
    banner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    bannerText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})