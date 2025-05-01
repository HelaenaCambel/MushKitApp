import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const TopNavBar = ({ user }) => {
    const navigation = useNavigation();
    const route = useRoute();

    const menuItems = [
        { text: 'Home', route: 'HomeScreen', iconName: 'home' },
        { text: 'Dashboard', route: 'DashboardScreen', iconName: 'dashboard' },
        { text: 'Data History', route: 'HistoryScreen', iconName: 'history' },
        { text: 'Profile', route: 'ProfileScreen', iconName: 'person' },
    ];

    const handleLogout = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.navContainer}>
            {menuItems.map(({ text, iconName, route: navRoute }) => (
                <TouchableOpacity
                    key={navRoute}
                    style={[
                        styles.navItem,
                        route.name === navRoute && styles.activeItem,
                    ]}
                    onPress={() => navigation.navigate(navRoute)}
                >
                    <Icon name={iconName} size={20} color="#fff" />
                    <Text style={styles.navText}>{text}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                <Icon name="logout" size={20} color="#fff" />
                <Text style={styles.navText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    navItem: {
        alignItems: 'center',
        padding: 5,
    },
    navText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 2,
    },
    activeItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#00bfff',
    },
});

export default TopNavBar;
