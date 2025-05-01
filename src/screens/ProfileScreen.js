import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import NavBar from '../static/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);

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

    if (!userData) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2e86de" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <NavBar />
                <View style={styles.mainContent}>
                    <Text>Email: {userData.email}</Text>
                    <Text>Password: {userData.password}</Text>
                    <Text>PIN: {userData.pin}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff', },
    container: { flex: 1, justifyContent: 'space-between', },
    mainContent: { flex: 1, padding: 24, justifyContent: 'center' },
    header: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});


export default ProfileScreen;