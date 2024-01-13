// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBX2B3KaId_57P4mvp4PuIdyhp9ERPCbEs",
  authDomain: "ticket-booking-app-49ea2.firebaseapp.com",
  projectId: "ticket-booking-app-49ea2",
  storageBucket: "ticket-booking-app-49ea2.appspot.com",
  messagingSenderId: "756808277694",
  appId: "1:756808277694:web:59a8a3109217ab8a03c8ef",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
