import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'RegUsers', user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigation.replace('Login');
    };

    if (!userData) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2e86de" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Profile</Text>
            <Text>Email: {userData.email}</Text>
            <Text>Password: {userData.password}</Text>
            <Text>Created At: {userData.createdAt?.toDate?.().toString() || 'N/A'}</Text>

            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    header: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});
