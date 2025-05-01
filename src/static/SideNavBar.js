import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SideNavBar = () => {
    const navigation = useNavigation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [widthAnim] = useState(new Animated.Value(70));

    const toggleSidebar = () => {
        Animated.timing(widthAnim, {
            toValue: isExpanded ? 70 : 200,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setIsExpanded(!isExpanded);
    };

    const menuItems = [
        { name: 'Home', icon: 'home', screen: 'Home' },
        { name: 'Dashboard', icon: 'dashboard', screen: 'Dashboard' },
        { name: 'Data History', icon: 'history', screen: 'Data History' },
        { name: 'MushKit Details', icon: 'work', screen: 'MushKit Details' },
        { name: 'User Profile', icon: 'person', screen: 'User Profile' },
    ];

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <Animated.View style={[styles.sidebar, { width: widthAnim }]}>
            <View style={styles.innerContainer}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={toggleSidebar}>
                            <Icon name={isExpanded ? 'chevron-left' : 'chevron-right'} size={24} color="#fff" />
                        </TouchableOpacity>
                        {isExpanded && <Text style={styles.brand}>MushKit</Text>}
                    </View>

                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.name}
                            style={styles.menuItem}
                            onPress={() => item.screen && navigation.navigate(item.screen)}
                        >
                            <Icon name={item.icon} size={20} color="#fff" />
                            {isExpanded && <Text style={styles.menuText}>{item.name}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Icon name="logout" size={20} color="#fff" />
                    {isExpanded && <Text style={styles.menuText}>Logout</Text>}
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: '#1e1e2f',
        height: '100%',
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        gap: 10,
    },
    brand: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 15,
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SideNavBar;
