import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigation, SearchNavigation, ProfileNavigation } from "./StackNavigation";
import { Ionicons } from '@expo/vector-icons';
import { firebaseAuth } from '../config/Firebase';

const Tab = createBottomTabNavigator();

//set the bottom navigation icons
const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
            iconName = 'md-home';
        } else if (route.name === 'Search') {
            iconName = 'md-search-sharp';
        } else if (route.name === 'Profile') {
            iconName = 'person-circle';

        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={StackNavigation} options={{ title: 'Home' }} />
            <Tab.Screen name="Search" component={SearchNavigation} options={{ title: 'Search' }}
                listeners={{
                    tabPress: x => {
                        if (!firebaseAuth.currentUser) {
                            x.preventDefault();
                        }
                    }
                }} />
            <Tab.Screen name='Profile' component={ProfileNavigation} options={{ title: 'Profile' }}
                listeners={{
                    tabPress: x => {
                        if (!firebaseAuth.currentUser) {
                            x.preventDefault();
                        }
                    }
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;