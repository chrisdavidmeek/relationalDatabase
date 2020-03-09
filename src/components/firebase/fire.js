import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAD9qWDQ6b0YoAB2WAWXPjnDUZJ-B4rElA",
  authDomain: "relational-database-meek.firebaseapp.com",
  databaseURL: "https://relational-database-meek.firebaseio.com",
  projectId: "relational-database-meek",
  storageBucket: "relational-database-meek.appspot.com",
  messagingSenderId: "448152844425",
  appId: "1:448152844425:web:ad7b6fc653f5730d832e58",
  measurementId: "G-HCYB7F29WS"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
