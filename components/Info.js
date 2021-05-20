import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { useFonts, ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';

export default function Info() {

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
                <ScrollView style={styles.scrollView}>
                    <View style={styles.textHeader}>
                        <Text style={styles.header}>Info</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <View style={styles.inputBackground}>

                            <Text style={styles.infoHeader}>How to use BookApp:</Text>
                            <Text style={styles.infoText}>You can't explore in BookApp if you are not logged in,
                            so first you need to login to the application. If you dont
                            have account, you can make one by clicking "Create a new accout"
                            in home page. You need to pick yourself a username, provide your
                            email address and type your password.
                    </Text>
                            <Text style={styles.infoHeader}>Search:</Text>
                            <Text style={styles.infoText}>You can search a book by it's title. You don't need to know full
                            title, but you get more accurate search result by writing full title.
                    </Text>
                            <Text style={styles.infoHeader}>Profile:</Text>
                            <Text style={styles.infoText}>Profile page shows your username and you can logout there.
                    </Text>
                        </View>
                    </View>
                </ScrollView>
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
    scrollView: {
        marginHorizontal: 1,
    },
    bg: {
        flex: 1,
        resizeMode: 'cover'
    },
    textHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 20
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
        paddingHorizontal: 28,
        paddingBottom: 10
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
    },
    infoHeader: {
        fontSize: 18,
        marginTop: 6,
        fontStyle: 'italic'
    },
    infoText: {
        fontSize: 16
    }
});