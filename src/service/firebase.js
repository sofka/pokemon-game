import firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyAYC1tuB8cKJ-yTF_4cw8hSZcU7LFBin5w",
    authDomain: "pokemon-game-4f07c.firebaseapp.com",
    databaseURL: "https://pokemon-game-4f07c-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-4f07c",
    storageBucket: "pokemon-game-4f07c.appspot.com",
    messagingSenderId: "256629902379",
    appId: "1:256629902379:web:8ae7bc48f8b1e5f78d2e6e"
};
firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;
