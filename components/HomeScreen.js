import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function HomeScreen() {

    //Button functionalities here
    const buttonPressed = () => {
        Alert.alert('Button pressed');
    }

    return (
        <View style={styles.container}>
            <Text>Home screen is here!</Text>
            <Button onPress={buttonPressed} title="Press me"/> 
            <StatusBar style="auto" />
        </View>
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