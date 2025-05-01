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
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match!');
            return;
        }

        if (pin !== confirmPin) {
            Alert.alert('PIN do not match!');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password, pin);

            await setDoc(doc(db, "RegUsers", email), {
                email,
                password,
                pin,  
            });

            Alert.alert('User registered successfully!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPin('');
            setConfirmPin('');
        } catch (error) {
            console.error(error);
            Alert.alert('Registration failed', error.message);
        }
    };

    return (
        <View style={RegUserStyle.container}>
            <Text style={RegUserStyle.header}>Register</Text>

            <Text style={RegUserStyle.title}>Email</Text>
            <TextInput
                style={RegUserStyle.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={RegUserStyle.title}>Password</Text>
            <TextInput
                style={RegUserStyle.input}
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Text style={RegUserStyle.title}>Repeat Password</Text>
            <TextInput
                style={RegUserStyle.input}
                placeholder="Repeat Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Text style={RegUserStyle.title}>PIN</Text>
            <TextInput
                style={RegUserStyle.input}
                placeholder="Enter PIN"
                secureTextEntry
                value={pin}
                onChangeText={setPin}
            />

            <Text style={RegUserStyle.title}>Repeat Password</Text>
            <TextInput
                style={RegUserStyle.input}
                placeholder="Repeat PIN"
                secureTextEntry
                value={confirmPin}
                onChangeText={setConfirmPin}
            />

            <TouchableOpacity style={RegUserStyle.button} onPress={handleRegister}>
                <Text style={RegUserStyle.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegUserScreen;
