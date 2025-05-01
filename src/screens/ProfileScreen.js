import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import SideNavBar from '../static/SideNavBar';

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
        <View style={styles.container}>
            <SideNavBar /> 
            <View style={styles.mainContent}>
                <Text style={styles.header}>User Profile</Text>
                <Text>Email: {userData.email}</Text>
                <Text>Password: {userData.password}</Text>
                <Text>Created At: {userData.createdAt?.toDate?.().toString() || 'N/A'}</Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row' }, 
    mainContent: { flex: 1, padding: 24, justifyContent: 'center' },
    header: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});


export default ProfileScreen;