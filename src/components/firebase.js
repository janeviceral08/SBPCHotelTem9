import firebase from 'firebase'

const config={
    apiKey: "AIzaSyDxZKhqLrgU8oNPj3NvIo9NMnY27qEMBNI",
    authDomain: "hotel-fcm.firebaseapp.com",
    projectId: "hotel-fcm",
    storageBucket: "hotel-fcm.appspot.com",
    messagingSenderId: "706498592538",
    appId: "1:706498592538:web:1722f093a82549a40836a3",
    measurementId: "G-R7JW6KC5FJ"
}
firebase.initializeApp(config);
export default firebase