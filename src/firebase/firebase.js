// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuDzpIVfDhs_-7VH1Q6_rm35bgaTRk8zI",
  authDomain: "roombookings-c84e4.firebaseapp.com",
  projectId: "roombookings-c84e4",
  storageBucket: "roombookings-c84e4.appspot.com",
  messagingSenderId: "142392325218",
  appId: "1:142392325218:web:98d1f07219eb15f75d8d3b",
};
// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
