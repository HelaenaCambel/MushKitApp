import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import LoginStyle from '../styles/LoginStyles';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation(); 

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home'); 
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    };

    return (
        <View style={LoginStyle.container}>
            <Text style={LoginStyle.header}>Welcome to MushKit App!</Text>

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
                secureTextEntry={!passwordVisible}
            />

            <Button title="Login" onPress={handleLogin} />

            <View style={LoginStyle.registerContainer}>
                <Text style={LoginStyle.registerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={LoginStyle.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
