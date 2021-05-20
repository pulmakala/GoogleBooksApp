import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Firebase, { firebaseAuth } from '../config/Firebase';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';
import { Ionicons } from '@expo/vector-icons';

export default function Book({ navigation, route }) {
    //get the info about book for saving to database
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    //set the book as an item
    const item = route.params;

    //get the user
    const user = firebaseAuth.currentUser.uid ? firebaseAuth.currentUser.uid : null;

    //make const for firebase path
    const firebasePath = `users/${user}/favorites/`;

    //save book details
    const saveDetails = async () => {
        setTitle(item.volumeInfo.title);
        if (item.volumeInfo.authors !== undefined || item.volumeInfo.authors > 0) {
            setAuthor(item.volumeInfo.authors);
        } else {
            setAuthor('Author not found');
        }
        saveToFirebase();
    }

    //identifier from database
    const makeKey = () => {
        return Firebase.database().ref(firebasePath).push().getKey();
    }

    //save book to favorites
    const saveToFirebase = async () => {
        try {
            let key = makeKey();

            //set needed data
            Firebase.database().ref(firebasePath + key).set(
                {
                    key: key,
                    author: author,
                    title: title,
                    added: new Date().toLocaleDateString()
                }
            );
            Alert.alert('Success!', 'Book added to favorites!')
        } catch (error) {
            console.log("Error saving to favorites: " + error)
        }
    };

    //set the header font
    const [fontsLoaded] = useFonts({
        ReenieBeanie_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.textHeader}>
                    <Text style={styles.header}>{item.volumeInfo.title}</Text>
                </View>

                <View style={styles.textInputView}>
                    {/* Get the subtitle, and if there is none, leave blank */}
                    {item.volumeInfo.subtitle !== undefined || item.volumeInfo.subtitle > 0 ?
                        <Text style={styles.textSubtitle}> {item.volumeInfo.subtitle}</Text>
                        :
                        <Text style={styles.text2}></Text>
                    }
                    {/* Get the cover photo from API. If there is none, use the "Cover not found" photo */}
                    {item.volumeInfo.imageLinks === undefined ?
                        <Image style={styles.image}
                            source={require('../assets/covernotfound.png')} />
                        :
                        <Image style={styles.image}
                            source={{ uri: item.volumeInfo.imageLinks.thumbnail }} />
                    }

                    {/* Get the author name, and if there is none, write "author not found" */}
                    {item.volumeInfo.authors !== undefined || item.volumeInfo.authors > 0 ?
                        <Text style={styles.text2}>Author: {item.volumeInfo.authors}</Text>
                        :
                        <Text style={styles.text2}>Author not found</Text>
                    }

                    {/* Get publishing year if there is one. Print only year, not date or month.*/}
                    {item.volumeInfo.publishedDate !== undefined || item.volumeInfo.publishedDate > 0 ?
                        <Text style={styles.text2}>Published in {item.volumeInfo.publishedDate.split('-')[0]}</Text>
                        :
                        <Text style={styles.text2}>Publishing date not found</Text>
                    }

                    {/* Get publisher if there is one. */}
                    {item.volumeInfo.publisher !== undefined || item.volumeInfo.publisher > 0 ?
                        <Text style={styles.text2}>Published by {item.volumeInfo.publisher}</Text>
                        :
                        <Text style={styles.text2}>Publisher not found</Text>
                    }

                    {/* Get description if there is one. */}
                    {item.volumeInfo.description !== undefined || item.volumeInfo.description > 0 ?
                        <Text style={styles.text}>"{item.volumeInfo.description}"</Text>
                        :
                        <Text style={styles.text2}> </Text>
                    }

                    <TouchableOpacity onPress={saveDetails}>
                        <View style={styles.button}>
                            <Ionicons name="bookmarks-outline" size={24} color="white" />
                            <Text style={styles.buttonText}>Add to Favorites</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: '60%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'black'
    },
    scrollView: {
        marginHorizontal: 5,
    },
    bg: {
        flex: 1,
        resizeMode: 'cover'
    },
    textHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    header: {
        fontSize: 60,
        color: '#000',
        fontFamily: 'ReenieBeanie_400Regular',
        textAlign: 'center',
    },
    textInputView: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 28,
        marginBottom: 10
    },
    inputBackground: {
        backgroundColor: '#ebebeb',
        padding: 30,
        borderWidth: 1.5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.80,
    },
    textInput: {
        backgroundColor: 'white',
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
    text2: {
        textAlign: "left",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 10,
        fontSize: 18
    },
    text: {
        fontSize: 16,
        marginTop: 20
    },
    textSubtitle: {
        textAlign: "center",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 10,
        fontSize: 18
    },
    smallHeaderText: {
        textAlign: "center",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15,
        fontSize: 16
    },
    infoHeader: {
        fontSize: 18,
        marginTop: 6,
        fontStyle: 'italic'
    },
    infoText: {
        fontSize: 16
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#e1701a',
        borderRadius: 25,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 18
    },
});