// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7vSZiSgnPvQimqrpL8BdxhfJuqrvcvxU',
  authDomain: 'roller-gate.firebaseapp.com',
  databaseURL: 'https://roller-gate.firebaseio.com',
  projectId: 'roller-gate',
  storageBucket: 'roller-gate.appspot.com',
  messagingSenderId: '166585497287',
  appId: '1:166585497287:web:328983ec327208b76930e2',
  measurementId: 'G-WCTT4GF33T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
