import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Firebase, { firebaseAuth } from '../config/Firebase';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';

export default function SignUp({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    //handle sign up
    const handleSignUp = () => {
        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(newUser => {
                Firebase.database().ref('users').child(newUser.user.uid).set({
                    username: username
                })
            })
            //if sign up is successful, give a alert about it
            .then(() => {
                Alert.alert('Account created');
            })
            //error alert if sign up was not successful
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Email address is invalid');
                }
                if (error.code === 'auth/email-already-exists') {
                    Alert.alert('An error occurred', 'Try different email address');
                }
                console.log(error);
            });
    }

    const checkPassword = () => {
        let check = password.localeCompare(passwordCheck);
        if (check === 0) {
            handleSignUp();
        } else {
            Alert.alert('Error', 'Passwords must match, please try again');
        }
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

                <View style={styles.textHeader}>
                    <Text style={styles.header}>Create a new account</Text>
                </View>

                <View style={styles.textInputView}>
                <View style={styles.inputBackground}>
                    <Text style={styles.smallHeaderText}>Please fill your information</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry
                        placeholder="Retype password"
                        value={passwordCheck}
                        onChangeText={setPasswordCheck}
                    />
                    <TouchableOpacity onPress={checkPassword}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </View>
                    </TouchableOpacity>
                

                <View style={styles.text2}>
                    <Text style={styles.text} onPress={() => navigation.navigate('Home')}>Already have an account? Sign in!</Text>
                </View>

                </View>
                </View>

            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    );
}

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
        marginTop: 20
      },
      header: {
        fontSize: 65,
        color: '#fff',
        fontFamily: 'ReenieBeanie_400Regular',
        textAlign: 'center'
    },
    textInputView: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center',
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
    input: {
        fontSize: 20,
        borderWidth: 1,
        width: 250,
        height: 40,
        marginBottom: 15,
        paddingLeft: 5,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    inputView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    signIn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
      text2: {
        textAlign: "center",
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopWidth: 1, 
        marginTop: 10
      },
      text: {
        fontSize: 15,
        marginTop: 20
      },
      smallHeaderText: {
        textAlign: "center",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15,
        fontSize: 16
      }
});
