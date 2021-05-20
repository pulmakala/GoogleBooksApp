import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import SignUp from "../components/SignUp";
import Search from "../components/Search";
import Profile from "../components/Profile";
import Info from "../components/Info";
import Book from "../components/Book";
import Favorites from "../components/Favorites";

const Stack = createStackNavigator();

//styling
const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#e1701a",
        opacity: 0.85
    },
    headerTitleAlign: 'center',
    headerTintColor: "white",
    headerBackTitle: "Back",
}

//the main stack navigation for home page and sign up page
const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Info" component={Info} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    );
}

//navigation to search page & between Search and Book
const SearchNavigation = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Book" component={Book} />
        </Stack.Navigator>
    )
}

//navigation to profile page & between Profile and Favorites
const ProfileNavigation = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
    )
}

export { StackNavigation, SearchNavigation, ProfileNavigation };