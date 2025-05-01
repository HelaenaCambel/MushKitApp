import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegUserStyle from '../styles/RegUserStyles';

const RegUserScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const [kit_id, setKitID] = useState('');
    const [kit_name, setKitName] = useState('');
    const [mushKits, setMushKits] = useState([]);

    const handleAddMushKit = () => {
        if (!kit_id || !kit_name) return;

        setMushKits(prev => [...prev, { kit_id, kit_name }]);
        setKitID('');
        setKitName('');
    };

    const handleDeleteKit = (index) => {
        setMushKits(prev => prev.filter((_, i) => i !== index));
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match!');
            return;
        }

        if (pin !== confirmPin) {
            Alert.alert('PIN do not match!');
            return;
        }

        const allMushKits = [...mushKits];
        if (kit_id && kit_name) {
            allMushKits.push({ kit_id, kit_name });
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", email), {
                email,
                password,
                pin,
                mushKits: allMushKits,
            });

            Alert.alert('User registered successfully!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPin('');
            setConfirmPin('');
            setKitID('');
            setKitName('');
            setMushKits([]);
        } catch (error) {
            console.error(error);
            Alert.alert('Registration failed', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={RegUserStyle.container}>
                    <Text style={RegUserStyle.header}>User Profile</Text>

                    <Text style={RegUserStyle.title}>Email</Text>
                    <TextInput style={RegUserStyle.input} placeholder="Enter Email" value={email} onChangeText={setEmail} />
                    <Text style={RegUserStyle.title}>Password</Text>
                    <TextInput style={RegUserStyle.input} placeholder="Enter Password" secureTextEntry value={password} onChangeText={setPassword} />
                    <Text style={RegUserStyle.title}>Repeat Password</Text>
                    <TextInput style={RegUserStyle.input} placeholder="Repeat Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

                    <View style={RegUserStyle.PINContainer}>
                        <View style={RegUserStyle.rowPIN}>
                            <Text style={RegUserStyle.title}>PIN</Text>
                            <TextInput style={RegUserStyle.input} placeholder="Enter PIN" secureTextEntry value={pin} onChangeText={setPin} />
                        </View>
                        <View style={RegUserStyle.rowRepeatPIN}>
                            <Text style={RegUserStyle.title}>Repeat PIN</Text>
                            <TextInput style={RegUserStyle.input} placeholder="Repeat PIN" secureTextEntry value={confirmPin} onChangeText={setConfirmPin} />
                        </View>
                    </View>

                    <Text style={RegUserStyle.header}>MushKit Details</Text>
                    {mushKits.map((kit, index) => (
                        <View style={RegUserStyle.KitContainer} key={index}>
                            <View style={RegUserStyle.rowKitID}>
                                <Text style={RegUserStyle.title}>MushKit ID#</Text>
                                <TextInput
                                    style={RegUserStyle.input}
                                    value={kit.kit_id}
                                    editable={true}  
                                    onChangeText={(text) => {
                                        const updatedKits = [...mushKits];
                                        updatedKits[index].kit_id = text;
                                        setMushKits(updatedKits);
                                    }}
                                />
                            </View>
                            <View style={RegUserStyle.rowKitName}>
                                <Text style={RegUserStyle.title}>MushKit Name</Text>
                                <TextInput
                                    style={RegUserStyle.input}
                                    value={kit.kit_name}
                                    editable={true} 
                                    onChangeText={(text) => {
                                        const updatedKits = [...mushKits];
                                        updatedKits[index].kit_name = text;
                                        setMushKits(updatedKits);
                                    }}
                                />
                            </View>
                            <View style={RegUserStyle.rowDelIcon}>
                                <TouchableOpacity onPress={() => handleDeleteKit(index)}>
                                    <DelIcon name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <View style={RegUserStyle.KitContainer}>
                        <View style={RegUserStyle.rowKitID}>
                            <Text style={RegUserStyle.title}>MushKit ID#</Text>
                            <TextInput style={RegUserStyle.input} placeholder="Enter MushKit ID#" value={kit_id} onChangeText={setKitID} />
                        </View>
                        <View style={RegUserStyle.rowKitName}>
                            <Text style={RegUserStyle.title}>MushKit Name</Text>
                            <TextInput style={RegUserStyle.input} placeholder="Enter MushKit Name" value={kit_name} onChangeText={setKitName} />
                        </View>
                        <View style={RegUserStyle.rowDelIcon}>
                            <TouchableOpacity onPress={() => setKitName('')}>
                                <DelIcon name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={RegUserStyle.rowContainer}>
                        <TouchableOpacity
                            style={[RegUserStyle.AddButton, { flex: 1, marginRight: 5, backgroundColor: (kit_id && kit_name) ? '#2196F3' : '#ccc' }]}
                            onPress={handleAddMushKit}
                            disabled={!kit_id || !kit_name}
                        >
                            <Text style={RegUserStyle.buttonText}>Add MushKit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[RegUserStyle.RegButton, { flex: 1, marginLeft: 5 }]} onPress={handleRegister}>
                            <Text style={RegUserStyle.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegUserScreen;