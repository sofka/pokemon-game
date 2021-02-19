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

class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = this.fire.database();
    }

    offPokemonSoket = () => {
        this.database.ref('pokemons').off();
    }


    getPokemonSoket = (cb) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(snapshot.val());
        })
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val())
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    addPokemon = async (data, replaceIdToKey) => {
        const newKey = (await this.database.ref().child('pokemon').push()).key;
        if (replaceIdToKey) {
            data.id = newKey;
        }
        this.database.ref('pokemons/' + newKey).set(data);
    }

}
const FirebaseClass = new Firebase();

export default FirebaseClass;
