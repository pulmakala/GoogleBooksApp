import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../config/Firebase';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';

const HomeScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Login
    const handleLogin = () => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('Search'))
            .catch(error => {

                //check the credentials
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    Alert.alert('Something went wrong', 'Please check your credentials');
                }
            });
    }

    //set the header font
    const [fontsLoaded] = useFonts({
        ReenieBeanie_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/books0.jpg')} style={styles.bg}>

                <Text style={styles.header} >BookApp</Text>

                <View style={styles.textInputView}>
                    <View style={styles.inputBackground}>
                        <Text style={styles.smallHeaderText}>Please log in</Text>
                        <View style={styles.inputSection}>

                            <TextInput
                                style={styles.textInput}
                                placeholder='email address'
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                            />
                        </View>

                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            placeholder='password'
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity onPress={handleLogin}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Login</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.underText}>
                            <Text style={styles.text}
                                onPress={() => navigation.navigate('SignUp')}>Create a new account</Text>

                            <Text style={styles.text}
                                onPress={() => navigation.navigate('Info')}>Learn about BookApp</Text>
                        </View>

                    </View>
                </View>

            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bg: {
        flex: 1,
        resizeMode: 'cover'
    },
    textHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    header: {
        fontSize: 85,
        color: '#fff',
        fontFamily: 'ReenieBeanie_400Regular',
        textAlign: 'center',
        marginVertical: 30,
    },
    smallHeaderText: {
        textAlign: "center",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15,
        fontSize: 16
    },
    underText: {
        textAlign: "center",
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopWidth: 1,
        marginTop: 13,
    },
    textInputView: {
        flex: 3.5,
        alignItems: 'center'
    },
    inputBackground: {
        backgroundColor: '#ebebeb',
        padding: 33,
        borderWidth: 1.5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.80
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1.2,
        width: 210,
        height: 40,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#e1701a',
        borderRadius: 25,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 20
    },
    text: {
        fontSize: 15,
        marginTop: 10
    },
    stack: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
});