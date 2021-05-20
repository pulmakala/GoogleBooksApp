import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';
import Firebase, { firebaseAuth } from '../config/Firebase';
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Profile({ navigation }) {
    const [user, setUser] = useState({});
    //const isFocused = useIsFocused();
    const [image, setImage] = useState(null);


    useEffect(() => {
        userInfo();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

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

    //pick image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

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
            {/*<Ionicons name="person" size={120} color="black" />*/}
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.avatarButton}>
                    <Text style={styles.avatarButtonText}>Pick an image</Text>
                </View>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </TouchableOpacity>

            <View style={styles.textArea}>
                {/*Quote*/}
                <View style={styles.quoteArea}>
                    <Text style={styles.quote}>Reading is the sole means by which we slip,</Text>
                    <Text style={styles.quote}>involuntarily, often helplessly, into another’s skin,</Text>
                    <Text style={styles.quote}>another’s voice, another’s soul.</Text>
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
    scrollView: {
        marginHorizontal: 1,
    },
    textArea: {
        alignContent: 'center'
    },
    quote: {
        fontSize: 14,
        fontStyle: 'italic',
        margin: 1
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
    avatarButton: {
        backgroundColor: '#e1701a',
        borderRadius: 25,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        margin: 10
    },
    favButton: {
        backgroundColor: '#d49d42',
        borderRadius: 25,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 18
    },
    avatarButtonText: {
        color: 'white',
        padding: 5,
        fontSize: 18
    }
});