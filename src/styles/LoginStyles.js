// LoginStyles.js
import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
    registerContainer: {
        flexDirection: 'row',  
        justifyContent: 'center', 
        marginTop: 20,
    },
    registerText: {
        textAlign: 'center',
    },
    link: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default LoginStyles;
