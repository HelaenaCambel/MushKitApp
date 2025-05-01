import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    const [lightStatus, setLight] = useState(null);
    const [waterStatus, setWater] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

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
                            console.log(sensorData?.lightStatus);
                            console.log(sensorData?.waterStatus);
                            console.log(sensorData?.timestamp); 
                            setTemperature(sensorData?.temperature);
                            setHumidity(sensorData?.humidity);
                            setLight(sensorData?.lightStatus);
                            setWater(sensorData?.waterStatus);
                            setLastUpdate(sensorData?.timestamp); 
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

    const getWaterStatusIcon = () => {
        if (waterStatus === 'Low') {
            return 'water-alert-outline'; 
        } else if (waterStatus === 'Medium') {
            return 'water-alert'; 
        } else if (waterStatus === 'High') {
            return 'water';
        }
        return 'water-off-outline'; 
    };

    const getLightStatusIcon = () => {
        if (lightStatus === 'ON') {
            return 'lightbulb-on';
        } else if (lightStatus === 'OFF') {
            return 'lightbulb-outline';
        }
        return 'lightbulb-off-outline';
    };

    const formatTimestamp = (timestampStr) => {
        const date = new Date(timestampStr.replace(' ', 'T')); 
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).replace(',', '') + ' @ ' + date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <NavBar />
                    <View style={styles.mainContent}>
                        <Icon name="mushroom" size={50} color="#1e1e2f" />
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
                            <Text style={styles.mushKitText}>{mushKit?.kit_name}</Text>
                            <Text style={styles.mushKitText}>MushKit ID# {mushKit?.kit_id}</Text>
                        </View>
                    ))}
                    <View style={styles.GaugeRow}>
                        <Gauge label="Temperature" value={temperature || 0} unit="°C" />
                        <Gauge label="Humidity" value={humidity || 0} unit="%" />
                    </View>

                    <View style={styles.statusRow}>
                        <View style={styles.lightColumn}>
                            <Text style={styles.statusText}> Growing Light Status </Text>
                            <View style={styles.lightRow}>
                                <Icon name={getLightStatusIcon()} size={30} color="#000" />
                                <Text> {lightStatus ?? 'Loading...'} </Text>
                            </View>
                        </View>
                        <View style={styles.waterColumn}>
                            <Text style={styles.statusText}> Water Level Status </Text>
                            <View style={styles.waterRow}>
                                <Icon name={getWaterStatusIcon()} size={30} color="#000" />
                                <Text> {waterStatus ?? 'Loading...'} </Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.statusText}> Last Updated: </Text>
                    <Text> {lastUpdate ? formatTimestamp(lastUpdate) : 'Loading...'} </Text>
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
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderWidth: 2,             
        borderColor: '#ccc',        
        borderRadius: 10,            
        margin: 15,                  
    },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtext: { fontSize: 16, color: '#666', marginBottom: 20 },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingBottom: 15 },
    GaugeRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', },
    mushKitText: { fontSize: 20, textAlign: 'center', },
    statusText: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 10 },
    waterColumn: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    waterRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    lightColumn: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    lightRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
