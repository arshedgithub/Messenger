import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyATD5oxnuuIOptG1_uZTayzyOV61kQ1QgQ",
  authDomain: "firechat-be87a.firebaseapp.com",
  projectId: "firechat-be87a",
  storageBucket: "firechat-be87a.appspot.com",
  messagingSenderId: "183344468015",
  appId: "1:183344468015:web:5222a40a574f21c97f36da",
  measurementId: "G-Q1F0QJV6GH",
});

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => firebase.auth().currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(false);

      if (initializing) setInitializing(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  console.log(user);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signOut = async () => {
    try {
      firebase.auth().signOut();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      {user ? (
        <button onClick={signOut}>sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>sign in with google</button>
      )}
      <h1>chat</h1>
    </div>
  );
}

export default App;
