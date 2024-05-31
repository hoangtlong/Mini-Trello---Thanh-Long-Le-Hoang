// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.REACT_API_KEY",
  authDomain: "mini-trello-af759.firebaseapp.com",
  projectId: "mini-trello-af759",
  storageBucket: "mini-trello-af759.appspot.com",
  messagingSenderId: "867540088812",
  appId: "1:867540088812:web:4947f34dae0652de3d32c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const auth = getAuth(app);

export {database, auth}
