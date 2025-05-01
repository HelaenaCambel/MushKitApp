import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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

    const [kitID, setKitID] = useState('');
    const [kitName, setKitName] = useState('');
    const [mushKits, setMushKits] = useState([]);

    const handleAddMushKit = () => {
        if (!kitID || !kitName) return;

        setMushKits(prev => [...prev, { kitID, kitName }]);
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

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", email), { email, password, pin, mushKits });

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
                            value={kit.kitID}
                            editable={true}  
                            onChangeText={(text) => {
                                const updatedKits = [...mushKits];
                                updatedKits[index].kitID = text;
                                setMushKits(updatedKits);
                            }}
                        />
                    </View>
                    <View style={RegUserStyle.rowKitName}>
                        <Text style={RegUserStyle.title}>MushKit Name</Text>
                        <TextInput
                            style={RegUserStyle.input}
                            value={kit.kitName}
                            editable={true} 
                            onChangeText={(text) => {
                                const updatedKits = [...mushKits];
                                updatedKits[index].kitName = text;
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
                    <TextInput style={RegUserStyle.input} placeholder="Enter MushKit ID#" value={kitID} onChangeText={setKitID} />
                </View>
                <View style={RegUserStyle.rowKitName}>
                    <Text style={RegUserStyle.title}>MushKit Name</Text>
                    <TextInput style={RegUserStyle.input} placeholder="Enter MushKit Name" value={kitName} onChangeText={setKitName} />
                </View>
                <View style={RegUserStyle.rowDelIcon}>
                    <TouchableOpacity onPress={() => setKitName('')}>
                        <DelIcon name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={RegUserStyle.rowContainer}>
                <TouchableOpacity
                    style={[RegUserStyle.AddButton, { flex: 1, marginRight: 5, backgroundColor: (kitID && kitName) ? '#2196F3' : '#ccc' }]}
                    onPress={handleAddMushKit}
                    disabled={!kitID || !kitName}
                >
                    <Text style={RegUserStyle.buttonText}>Add MushKit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[RegUserStyle.RegButton, { flex: 1, marginLeft: 5 }]} onPress={handleRegister}>
                    <Text style={RegUserStyle.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegUserScreen;