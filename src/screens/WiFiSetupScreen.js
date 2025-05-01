import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WiFiSetupScreen = () => {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleWiFiSetup = async () => {
        try {
            setStatus('Connecting...');

            // Change the IP to the ESP32's IP address (e.g., 192.168.4.1)
            const response = await axios.post('http://192.168.4.1/setWifi', {
                ssid: ssid,
                password: password
            });

            if (response.data.includes('Connected to Wi-Fi')) {
                setStatus('Connected to Wi-Fi!');
            } else {
                setStatus('Failed to connect.');
            }
        } catch (error) {
            setStatus('Error connecting to ESP32');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Up Wi-Fi</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter SSID"
                value={ssid}
                onChangeText={setSsid}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Submit" onPress={handleWiFiSetup} />
            <Text>{status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    }
});

export default WiFiSetupScreen;
