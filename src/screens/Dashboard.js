import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../static/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <NavBar />
                <View style={styles.content}>
                    <Text style={styles.header}>Welcome to MushKit</Text>
                    <Text style={styles.subtext}>This is the Dashboard.</Text>
                </View>
            </View>
        </SafeAreaView>
    );  
};

export default Dashboard;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff', },
    container: { flex: 1, justifyContent: 'space-between', },
    content: { flex: 1,  justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5', },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333', },
    subtext: { fontSize: 16, color: '#666',},
});
