import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegUserStyle from '../styles/RegUserStyles';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegUserScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match!');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "RegUsers", email), {
                email,
                password  
            });

            Alert.alert('User registered successfully!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            Alert.alert('Registration failed', error.message);
        }
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
