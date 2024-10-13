import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import for authentication
import { getFirestore } from "firebase/firestore";  // Import for Firestore

// Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyA_BJYqK00hgcJsHAMqoHrEBzXvhm1Sw_U",
    authDomain: "chatapp-a5627.firebaseapp.com",
    projectId: "chatapp-a5627",
    storageBucket: "chatapp-a5627.appspot.com",
    messagingSenderId: "331127088056",
    appId: "1:331127088056:web:573619212e8ef9148ce54d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services using modular syntax
const auth = getAuth(app);  // Get auth instance
const firestore = getFirestore(app);  // Get Firestore instance


export const Context = createContext(null);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Context.Provider value={{ auth, firestore }}>
            <App />
        </Context.Provider>
    </StrictMode>
);
