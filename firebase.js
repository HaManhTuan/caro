import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyDq3tMIrDTIMFLTRYRzWMgwsdaeP-UI5x4",
  authDomain: "hybird-7e404.firebaseapp.com",
  databaseURL: "https://hybird-7e404-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hybird-7e404",
  storageBucket: "hybird-7e404.appspot.com",
  messagingSenderId: "1046182384901",
  appId: "1:1046182384901:web:05522ad08aecc176ca936c",
  measurementId: "G-K0TJGP0LET"
};

firebase.initializeApp(config);

export default firebase.database();
