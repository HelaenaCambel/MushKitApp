import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation();

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
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.iconButton}
                    onPress={() => navigation.navigate(item.screen)}
                >
                    <Icon name={item.icon} size={28} color="#fff" />
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                <Icon name="logout" size={28} color="#fff" />
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
        borderTopWidth: 1,
        borderTopColor: '#444',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NavBar;
