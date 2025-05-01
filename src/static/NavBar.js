import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const currentScreen = route.name;

    const menuItems = [
        { icon: 'home', screen: 'Home' },
        { icon: 'dashboard', screen: 'Dashboard' },
        { icon: 'history', screen: 'Data History' },
        { icon: 'work', screen: 'MushKit Details' },
        { icon: 'person', screen: 'User Profile' },
    ];

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.navbar}>
            {menuItems.map((item, index) => {
                const isActive = currentScreen === item.screen;
                return (
                    <TouchableOpacity key={index} style={[styles.navItem, styles.iconButton]} 
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <Icon name={item.icon} size={24} color={isActive ? "#4CAF50" : "#E0E0E0"} />
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                <Icon name="logout" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1e1e2f',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NavBar;
