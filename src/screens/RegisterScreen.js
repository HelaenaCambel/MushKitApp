import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegisterStyle from '../styles/RegisterStyles';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match!');
            return;
        }
        // Add Firebase registration logic here
        Alert.alert('User registered successfully!');
    };

    return (
        <View style={RegisterStyle.container}>
            <Text style={RegisterStyle.header}>Register</Text>

            <TextInput
                style={RegisterStyle.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={RegisterStyle.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={RegisterStyle.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={RegisterStyle.button} onPress={handleRegister}>
                <Text style={RegisterStyle.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
