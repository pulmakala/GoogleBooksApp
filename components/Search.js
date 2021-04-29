import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image, FlatList } from 'react-native';
import { API_KEY } from "@env";

export default function Search() {
    const [apiKey, setApiKey] = useState(API_KEY);
    const [books, setBooks] = useState([]);
    const [result, setResult] = useState([]);
    const [book, setBook] = useState('');
    const [searched, setSearched] = useState('');
    
    //Button functionalities here
    //function buttonPressed(event) {
        //const searchedWord = searched;
        //const searched = event.target.value;
        //setBook(searched);
        //console.log(searchedWord);
        //event.preventDefault();
        //console.log(searched);
        //Alert.alert('Your searched word is ' + searched);
        //getBooks(searched);
        //getData();
    //}

    //function handleSubmit(event) {
    //    event.preventDefault();
    //    console.log(searched);
    //    fetch(
    //        `https://www.googleapis.com/books/v1/volumes?q=${searched}&key=${apiKey}`
    //    )
    //    .then(data => {
    //        console.log('Tähän asti toimii')
    //        console.log(data);
    //    })
       
    //}

    //Hakee API:sta kirjat haetulla hakusanalla
    //Tämä toimii toistaiseksi parhaiten. Ja tää on sit se mikä toimii myös huonoiten.
    const getData = async () => {
       try {
           //let response = await fetch(
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searched}&key=${apiKey}`
            );
            let json = await response.json();
            console.log(json);
            console.log("Hakusana oli '" + searched + "'");
            setBooks(json);
            console.log("Books-DATA looks like this: " + books);
            return json;
            //return json.books;
       } catch (error) {
           console.error(error);
       }
    };

    //getBooks = () => {
    //    fetch(
    //        `https://www.googleapis.com/books/v1/volumes?q=${searched}&key=${apiKey}`
    //        )
    //    .then(response => response.json())
    //    .then(responseJson => setBooks(responseJson.results))
    //    .catch((error) => {
    //        Alert.alert('Error', error);
    //    });
    //    console.log('Haku onnistui ' + searched);
    //}

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%"
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <FlatList
                style={{marginLeft: "5%"}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                <View>
                    <Text style={{fontSize: 18}}>Title:{item.volumeInfo.title}</Text>
                    <Image
                        style={{width: 66, height: 58}}
                        source={{uri: item.volumeInfo.imageLinks.thumbnail}}
                    />
                </View>}
                data={books}
                ItemSeparatorComponent={listSeparator} />
            <Text>Search a book!</Text>
            <TextInput
                style={styles.input}
                onChangeText={searched => setSearched(searched)}
                value={searched}
                placeholder='Search a book by title'
            />
            <Button onPress={getData} title="Press me"/>         
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
  input: {
      width: 200,
      borderWidth: 1,
      borderColor: 'black',
      paddingRight: 10,
      paddingLeft: 10,
      margin: 10
  }
});