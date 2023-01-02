import React, { createContext, useContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
import {
    doc,
    getFirestore,
    query,
    getDocs,
    setDoc,
    collection,
    where,
    addDoc,
    updateDoc,
    serverTimestamp,
    limit,
    getDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Events } from "../enums/events";

export interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
  const userRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curr_user) => {
      if (curr_user) {
        setUser({
          email: curr_user.email,
          uid: curr_user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();

  const validUser = () => {
    if (user) {
        return true;
    }

    return false;
  }

  const signUp = async (first_name: string, last_name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const name = first_name + " " + last_name;
        await setDoc(doc(userRef, user.uid), {
            uid: user.uid,
            first_name: first_name,
            last_name: last_name,
            name: name,
            authProvider: "local",
            email: email,
            points: 0,
            registered: {},
            added_time: serverTimestamp(),
        });
    } catch (err: any) {
        console.error(err);
    }
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const google_user = res.user;
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);

        const docRef = doc(db, "users", google_user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(doc(userRef, google_user.uid), {
                uid: google_user.uid,
                first_name: "",
                last_name: "",
                name: google_user.displayName,
                authProvider: "google",
                email: google_user.email,
                points: 0,
                registered: {
                  [Events.hacks8]: true,
                },
                added_time: serverTimestamp(),
            });
        }
    } catch (err: any) {
        console.error(err);
    }
  };

  const storeFirstAndLastName = async (first_name: string, last_name: string) => {
    try {
        const docRef = doc(db, "users", user.uid ? user.uid : "");
        console.log(user);
        await updateDoc(docRef, {
            first_name: first_name,
            last_name: last_name,
        });
    } catch (err: any) {
        console.log(err);
    }
  };

  const hasFirstAndLastName = async () => {
      console.log("HAS FIRST AND LAST?");
      console.log(user);
      const docRef = doc(db, "users", user.uid ? user.uid : "1");
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      console.log(docSnap.exists() ? docSnap.data().first_name : null);
      console.log("CHECK");
      if (docSnap.exists()) {
        console.log(docSnap.data().first_name === "");
        console.log(docSnap.data().first_name)
      }
      if (docSnap.exists() && (docSnap.data().first_name === "" || docSnap.data().last_name === "")) {
        console.log("ENTERED THE IF STATEMENT");
          return false;
      }

      return true;
  };

  const getFirstName = async () => {
    const docRef = doc(db, "users", user.uid ? user.uid : "0");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }
    console.log("DOCSNAP")
    console.log(docSnap.data())
    return docSnap.data().first_name;
  }

  const getRegisteredEvents = async () => {
    const docRef = doc(db, "users", user.uid ? user.uid : "0");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data().registered;
  }
  
  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logInWithGoogle, logOut, storeFirstAndLastName, hasFirstAndLastName, validUser, getFirstName, getRegisteredEvents }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};