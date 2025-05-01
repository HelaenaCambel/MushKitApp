import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MushIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../static/NavBar';
import Gauge from '../dynamic/Gauge';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log(data);
                    setUserData(data);

                    const kitId = data?.mushKits?.[0]?.kit_id;
                    if (kitId) {
                        const sensorRef = doc(db, 'sensorData', kitId);  
                        const sensorDocSnap = await getDoc(sensorRef);
                        if (sensorDocSnap.exists()) {
                            const sensorData = sensorDocSnap.data();
                            console.log(sensorData?.temperature);
                            console.log(sensorData?.humidity); 
                            setTemperature(sensorData?.temperature);
                            setHumidity(sensorData?.humidity);
                        } else {
                            console.log('No sensor data found for this kit_id');
                        }
                    }
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
                <View style={styles.content}>
                    {userData?.mushKits?.map((mushKit, index) => (
                        <View key={index}>
                            <Text>{mushKit?.kit_name}</Text>
                            <Text>MushKit ID: {mushKit?.kit_id}</Text>
                        </View>
                    ))}
                    <Gauge label="Temperature" value={temperature || 0} unit="°C" />
                    <Gauge label="Humidity" value={humidity || 0} unit="%" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1 },
    mainContent: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtext: { fontSize: 16, color: '#666', marginBottom: 20 },
});
