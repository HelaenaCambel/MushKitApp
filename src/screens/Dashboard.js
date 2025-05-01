import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SideNavBar from '../static/SideNavBar'; 

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <SideNavBar />
            <View style={styles.content}>
                <Text style={styles.header}>Welcome to MushKit</Text>
                <Text style={styles.subtext}>This is the Dashboard.</Text>
            </View>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtext: {
        fontSize: 16,
        color: '#666',
    },
});
