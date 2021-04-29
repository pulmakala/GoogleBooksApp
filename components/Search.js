import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image, FlatList } from 'react-native';
import { API_KEY } from "@env";

export default function Search() {
    const [apiKey, setApiKey] = useState(API_KEY);
    const [books, setBooks] = useState([]);
    const [result, setResult] = useState([]);
    const [searched, setSearched] = useState('');
   
    //Hakee API:sta kirjat haetulla hakusanalla
    //Tämä toimii osittain. Hakee tiedot, mutta ne ei tallennnu bookseihin.
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