import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, set, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
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

const firebaseGoogleAuthprovider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const UseFirebasecontext = () => useContext(FirebaseContext);

export default function Firebaseprovider(props) {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUser = (userEmail, userPassword) => {
    return createUserWithEmailAndPassword(
      firebaseAuth,
      userEmail,
      userPassword
    );
  };
  const loginUserwithGoogle = () =>
    signInWithPopup(firebaseAuth, firebaseGoogleAuthprovider);

  const checkUser = (userEmail, userPassword) => {
    return signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword);
  };

  const setnewUser = (key, data) => {
    return set(ref(firebaseDatabase, key), data);
  };

  const isLoggedIn = user? true: false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        checkUser,
        loginUserwithGoogle,
        setnewUser,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
}
