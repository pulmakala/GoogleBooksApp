import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { API_KEY } from "@env";
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';

export default function Search({ navigation }) {
    const [apiKey] = useState(API_KEY);
    const [books, setBooks] = useState([]);
    const [searched, setSearched] = useState('');

    //Get books from API with word given in input field
    const getData = async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searched}&maxResults=40&key=${apiKey}`
            );
            let json = await response.json();
            //check out the searched word
            console.log("Searched word was '" + searched + "'");
            setBooks(json.items);
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    //create line to separate books in list
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
            <View style={styles.textView}>
                {/* Search-bar header and button */}
                <View style={styles.header}>
                    <StatusBar hidden={true} />
                    <Text style={styles.headerFont}>Search a book</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={searched => setSearched(searched)}
                        value={searched}
                        placeholder='Search a book by title'
                    />

                    <View style={styles.textInputView}></View>
                    <TouchableOpacity onPress={getData}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.textView}>
                    {/* Book listing */}
                    <FlatList
                        style={styles.flatlist}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>

                            <View style={styles.list}>

                                {/* Get the cover photo from API. If there is none, use the "Cover not found" photo */}
                                {item.volumeInfo.imageLinks === undefined ?
                                    <Image style={styles.image}
                                        source={require('../assets/covernotfound.png')} />
                                    :
                                    <Image style={styles.image}
                                        source={{ uri: item.volumeInfo.imageLinks.thumbnail }} />
                                }

                                <View style={styles.bookDetails}>

                                    {/* Get the book title */}
                                    <Text style={styles.textTitle}>{item.volumeInfo.title}</Text>

                                    {/* Get the author name, and if there is none, write "author not found" */}
                                    {/* Check how to print multiple authors prettier way! */}
                                    {item.volumeInfo.authors !== undefined || item.volumeInfo.authors > 0 ?
                                        <Text style={styles.text}>By {item.volumeInfo.authors}</Text>
                                        :
                                        <Text style={styles.text}>Author not found</Text>
                                    }

                                    {/* Get publishing year if there is one. Print only year, not date or month.*/}
                                    {item.volumeInfo.publishedDate !== undefined || item.volumeInfo.publishedDate > 0 ?
                                        <Text style={styles.text2}>{item.volumeInfo.publishedDate.split('-')[0]}</Text>
                                        :
                                        <Text style={styles.text2}>Date not found</Text>
                                    }

                                    {/* Get publisher if there is one. */}
                                    {item.volumeInfo.publisher !== undefined || item.volumeInfo.publisher > 0 ?
                                        <Text style={styles.text2}>Published by {item.volumeInfo.publisher}</Text>
                                        :
                                        <Text style={styles.text2}>Publisher not found</Text>
                                    }

                                    <TouchableOpacity onPress={() => navigation.navigate('Book', item)}>

                                        <View style={styles.infoButton}>
                                            <Text style={styles.underText}>Learn more</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                        data={books}
                        ItemSeparatorComponent={listSeparatorLine} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1.2,
        width: 200,
        height: 30,
        margin: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 18,
    },
    headerFont: {
        fontSize: 40,
        color: '#000',
        fontFamily: 'ReenieBeanie_400Regular',
    },
    textTitle: {
        fontSize: 16,
        paddingLeft: "3%",
        fontWeight: "bold"
    },
    text: {
        fontSize: 16,
        paddingLeft: "3%",
    },
    text2: {
        fontSize: 15,
        paddingLeft: "3%",
        color: "#6f6d70"
    },
    image: {
        width: '30%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'black'
    },
    list: {
        paddingLeft: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bookDetails: {
        flexDirection: 'column',
        width: '70%'
    },
    flatlist: {
        marginLeft: "1%",
        padding: "5%",
    },
    button: {
        backgroundColor: '#e1701a',
        borderRadius: 25,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        padding: 7,
        fontSize: 16
    },
    underText: {
        textAlign: 'right',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 5,
        color: 'white'
    },
    infoButton: {
        backgroundColor: '#d49d42',
        borderRadius: 25,
        width: 100,
        alignItems: 'center',
        marginTop: 4,
        marginLeft: 10
    },
    textView: {
        paddingHorizontal: 2,
        marginBottom: 20
    }
});