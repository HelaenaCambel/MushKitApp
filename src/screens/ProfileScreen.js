import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MushIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../static/NavBar';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            }

            setTimeout(() => {
                setLoading(false);
            }, 200);
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <NavBar />
                    <View style={styles.mainContent}>
                        <MushIcon name="mushroom" size={50} color="#1e1e2f" />
                        <Text>Loading...</Text>
                    </View>
                </View>
            </SafeAreaView>
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
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, justifyContent: 'space-between' },
    mainContent: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});

export default ProfileScreen;
