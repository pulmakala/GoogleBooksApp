import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';
import Firebase, { firebaseAuth } from '../config/Firebase';
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();

    useEffect(() => {
        userInfo();
    }, [isFocused]);

    //fetch the user info for profile page
    const userInfo = async () => {
        try {
            await Firebase.database()
                .ref('/users/' + firebaseAuth.currentUser.uid)
                .on('value', snapshot => {
                    const result = snapshot.val();
                    setUser(result);
                });
        } catch (error) {
            console.log(error)
        }
    }

    //handle user logout
    const logout = async () => {
        try {
            await Firebase.auth().signOut();
            navigate('Home');
        } catch (error) {
            console.log(error);
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
            {/*Username*/}
            <Text style={styles.header}>{user.username}</Text>

            {/*Profile picture comes here later*/}
            <Ionicons name="person" size={120} color="black" />

            <View style={styles.textArea}>
                {/*Quote*/}
                <View style={styles.quoteArea}>
                    <Text style={styles.quote}>Reading is the sole means by which we slip,</Text>
                    <Text style={styles.quote}>involuntarily, often helplessly,</Text>
                    <Text style={styles.quote}>into another’s skin, another’s voice,</Text>
                    <Text style={styles.quote}>another’s soul.</Text>
                    <Text style={styles.quote}>- Joyce Carol Oates</Text>
                </View>
            </View>

            {/*Buttons*/}
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <View style={styles.favButton}>
                    <Text style={styles.buttonText}>Favorites</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </View>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    header: {
        fontSize: 60,
        color: '#000',
        fontFamily: 'ReenieBeanie_400Regular',
        margin: 10,
        justifyContent: 'flex-start',
    },
    textArea: {
        alignContent: 'center'
    },
    quote: {
        fontSize: 17,
        fontStyle: 'italic',
        margin: 2
    },
    quoteArea: {
        marginTop: 30
    },
    button: {
        backgroundColor: '#e1701a',
        borderRadius: 25,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    favButton: {
        backgroundColor: '#d49d42',
        borderRadius: 25,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 18
    }
});