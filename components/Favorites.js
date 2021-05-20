import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';
import Firebase, { firebaseAuth } from '../config/Firebase';
import { useIsFocused } from "@react-navigation/native";

export default function Favorites() {
    const user = firebaseAuth.currentUser ? firebaseAuth.currentUser : null;
    const [favs, setFavs] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        logFavs();
    }, [isFocused]);

    //helper to get the books
    const logFavs = async () => {
        getFavorites()
            .then(resp => setFavs(resp))
            .catch(error => console.log("Alert: " + error));
    }

    //get the favorite books
    const getFavorites = async () => {
        let books = [];
        if (user) {
            try {
                await Firebase.database()
                    .ref('/users/' + firebaseAuth.currentUser.uid + '/favorites')
                    .on('value', snapshot => {
                        if (snapshot.exists()) {
                            const result = snapshot.val();
                            const favBooks = Object.values(result);
                            books = favBooks;
                        }
                    });
                //catch errors if found any
            } catch (error) {
                console.log(error)
            }
        }
        return books;
    }

    //create line to separate favorite books in list
    const listSeparatorLine = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "90%",
                    backgroundColor: "#CED0CE",
                    margin: 10
                }}
            />
        );
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
            <Text style={styles.header}>Favorites</Text>

            <View style={styles.textView}>
                {/* Favorite book listing */}
                <FlatList
                    style={styles.flatlist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.list}>
                            <Text>{item.title}</Text>
                            <Text> {item.author}</Text>
                            <Text>Added to favorites {item.added}</Text>
                        </View>
                    }
                    data={favs}
                    ItemSeparatorComponent={listSeparatorLine} />
                <StatusBar style="auto" />
            </View>
        </View>
    );
};

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
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textArea: {
        alignContent: 'center'
    },
    list: {
        paddingLeft: 1,
    },
    textView: {
        paddingVertical: 20,
        paddingHorizontal: 1,
        marginBottom: 30
    },
    flatlist: {
        //marginLeft: "1%",
        padding: "5%",
    },
    button: {
        backgroundColor: '#e1701a',
        borderRadius: 25,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 18,
    }
});