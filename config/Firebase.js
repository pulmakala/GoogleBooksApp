//import * as firebase from "firebase/app";
import * as firebase from "firebase";

import {
    FB_API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID
} from '@env';

//use needed data from .env-file to firebase configuration
const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID
}

// Initialize Firebase
let Firebase = null;
if (!firebase.apps.length) {
    Firebase = firebase.initializeApp(firebaseConfig);
  } else {
    Firebase = firebase.app(); // if already firebase is initialized use that one
} 

export default Firebase;
export const firebaseAuth = Firebase.auth()