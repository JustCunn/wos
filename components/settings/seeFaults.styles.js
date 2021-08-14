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
    button: {
        //backgroundColor: '#f5f5f5',
        width: '100%',
        //margin: 5,
        height: 70,
        //borderRadius: 7,
        borderBottomColor: 'black',
        borderBottomWidth: 0.7,
        padding: 10,
        justifyContent: 'space-between'
        /*shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,*/
    },
    backgroundModal: {
        backgroundColor: 'rgba( 149, 149, 149, 0.8 )',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    faultTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
    },
    faultInfo: {
        display: 'flex',
        flexDirection: 'row'
    },
    faultTypeText: {
        marginRight: 10
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        height: '100%',
        borderRadius: 5,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    modalClose: {
        backgroundColor: '#4788c6',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        width: '90%'
    },
    modalCloseText: {
        color: 'white',
        fontSize: 18
    },
    modalScrollView: {
        height: 'auto',
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        width: '100%'
    },
    descText: {
        fontSize: 18
    }
})