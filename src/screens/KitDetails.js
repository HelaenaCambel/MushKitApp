import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import NavBar from '../static/NavBar';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const KitDetails = () => {
    const [mushKits, setMushKits] = useState([
        { kit_id: '0001', kit_name: 'GrowBox 1', wifi_ssid: 'HomeWiFi', wifi_pass: '12345678' },
        { kit_id: '0002', kit_name: 'GrowBox 2', wifi_ssid: 'FarmWiFi', wifi_pass: '87654321' },
    ]);

    const handleKitChange = (index, key, value) => {
        const updatedKits = [...mushKits];
        updatedKits[index][key] = value;
        setMushKits(updatedKits);
    };

    const handleRemoveKit = (index) => {
        const updatedKits = mushKits.filter((_, i) => i !== index);
        setMushKits(updatedKits);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <NavBar />
                <View style={styles.content}>
                    {
                        mushKits.map((kit, index) => (
                            <View key={index} style={styles.kitCard}>
                                <View style={styles.kitHeader}>
                                    <Text style={styles.kitId}>Kit ID: {kit.kit_id}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveKit(index)}>
                                        <DelIcon name="delete" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Kit Name"
                                    value={kit.kit_name}
                                    onChangeText={(value) => handleKitChange(index, 'kit_name', value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="WiFi SSID"
                                    value={kit.wifi_ssid}
                                    onChangeText={(value) => handleKitChange(index, 'wifi_ssid', value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="WiFi Password"
                                    value={kit.wifi_pass}
                                    onChangeText={(value) => handleKitChange(index, 'wifi_pass', value)}
                                    secureTextEntry
                                />
                            </View>
                        ))
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default KitDetails;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff',},
    container: { flex: 1 },
    content: { flex: 1, padding: 16, backgroundColor: '#f3f4f6', },
    kitCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    kitHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    kitId: {
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9fafb',
    },
});
