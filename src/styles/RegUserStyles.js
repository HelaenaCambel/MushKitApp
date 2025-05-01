import { StyleSheet } from 'react-native';

const RegUserStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: 1,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    }, 
    PINContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 25,
    }, 
    rowPIN: {
        flex: 1,
        marginRight: 5,
    },
    rowRepeatPIN: {
        flex: 1,
        marginLeft: 5,
    }, 
    KitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 25,
    }, 
    rowKitID: {
        flex: 0.8,
        marginRight: 5,
    },
    rowKitName: {
        flex: 1,
        marginHorizontal: 5,
    },
    rowDelIcon: {
        alignItems: 'center',
        paddingTop: 35, 
        flex: 0.2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 25,
    }, 
    AddButton: {
        backgroundColor: '#6495ed',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    RegButton: {
        backgroundColor: '#4CAF50',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegUserStyle;
