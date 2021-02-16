import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJb4wpeec2nuFaSHzhy02EmhC_XA-mzfA",
  authDomain: "aligram-1aade.firebaseapp.com",
  projectId: "aligram-1aade",
  storageBucket: "aligram-1aade.appspot.com",
  messagingSenderId: "1077400133499",
  appId: "1:1077400133499:web:7d58feeb65e44dd789a7de",
  measurementId: "G-1CXZEZZSNW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
