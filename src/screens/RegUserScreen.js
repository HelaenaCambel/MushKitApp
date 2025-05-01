import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegUserStyle from '../styles/RegUserStyles';

const RegUserScreen = () => {
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
        <View style={RegUserStyle.container}>
            <Text style={RegUserStyle.header}>Register</Text>

            <TextInput
                style={RegUserStyle.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={RegUserStyle.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={RegUserStyle.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={RegUserStyle.button} onPress={handleRegister}>
                <Text style={RegUserStyle.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegUserScreen;
