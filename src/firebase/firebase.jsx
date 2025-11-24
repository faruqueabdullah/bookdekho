import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getDatabase, set, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9wmMktha0bR2BygIBt8NgxXdA6Jq2GUA",
  authDomain: "bookdekho-e1329.firebaseapp.com",
  projectId: "bookdekho-e1329",
  storageBucket: "bookdekho-e1329.firebasestorage.app",
  messagingSenderId: "271823365256",
  appId: "1:271823365256:web:2d9192b14f6918ccd7ab3d",
};

const app = initializeApp(firebaseConfig);

const firebaseDatabase = getDatabase(app);
const firebaseAuth = getAuth(app);

const FirebaseContext = createContext(null);
export const UseFirebasecontext = () => useContext(FirebaseContext);

export default function Firebaseprovider(props) {
  const signupUser = (userEmail, userPassword) => {
    return createUserWithEmailAndPassword(
      firebaseAuth,
      userEmail,
      userPassword
    );
  };
  const checkUser = (userEmail, userPassword) => {
    return signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword);
  };

  const setUser = (key, data) => {
    return set(ref(firebaseDatabase, key), data);
  };

  return (
    <FirebaseContext.Provider value={{ signupUser, checkUser, setUser }}>
      {props.children}
    </FirebaseContext.Provider>
  );
}
