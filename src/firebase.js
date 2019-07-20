import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyAn7Mc7eBmZClRDW-VDQEphzWKMvMsmmrM",
    authDomain: "id-prod.firebaseapp.com",
    databaseURL: "https://id-prod.firebaseio.com",
    projectId: "id-prod",
    storageBucket: "id-prod.appspot.com",
    messagingSenderId: "140663729281",
    appId: "1:140663729281:web:9483014c422cdafb"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase 