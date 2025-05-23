import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegUserScreen from './src/screens/RegUserScreen';
import HomeScreen from './src/screens/HomeScreen';
import Dashboard from './src/screens/Dashboard';
import DataHistory from './src/screens/DataHistory';
import KitDetails from './src/screens/KitDetails';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegUserScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Data History" component={DataHistory} options={{ headerShown: false }} />
        <Stack.Screen name="MushKit Details" component={KitDetails} options={{ headerShown: false }} />
        <Stack.Screen name="User Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
