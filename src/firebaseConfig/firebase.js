import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbhh-w8OZKxAzma50cORx4NSdSUNS_8uQ",
    authDomain: "new-paractice.firebaseapp.com",
    projectId: "new-paractice",
    storageBucket: "new-paractice.appspot.com",
    messagingSenderId: "72632706508",
    appId: "1:72632706508:web:8321085f04da9dea446969"
  };

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);