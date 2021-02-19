import firebase from "firebase";
import config from  "./config.js"
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
