// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import LoginStyle from '../styles/LoginStyles';  

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }
        console.log('Logging in with:', email, password);
    };

    return (
        <View style={LoginStyle.container}>
            <Text style={LoginStyle.header}>Welcome to MushKit App! </Text>

            <TextInput
                style={LoginStyle.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={LoginStyle.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handleLogin} />

            <Text style={LoginStyle.registerText}>Don't have an account? <Text style={LoginStyle.link}>Sign up</Text></Text>
        </View>
    );
};

export default LoginScreen;
