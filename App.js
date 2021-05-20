import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from "./navigation/TabNavigation";

export default function App() {
    //set the bottom navigation icons
    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'home';
            } else if (route.name === 'Search') {
                iconName = 'search';
            } else if (route.name === 'Profile') {
                iconName = 'person';
            } else if (route.name === 'SignUp') {
                iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        }
    });

    return (
        <NavigationContainer>
            <BottomTabNavigation />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});