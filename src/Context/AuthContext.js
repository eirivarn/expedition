import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import PropTypes from "prop-types";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { addNewUser } from "../api/api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);
        console.log(currentUser);
        const usersRef = collection(db, "users");
        getDocs(usersRef).then((querySnapshot) => {
          const docIds = querySnapshot.docs.map((doc) => doc.id);

          if (docIds.includes(auth.currentUser.email)) {
            console.log("Bruker allerede i collectionen");
          } else {
            console.log(
              "Bruker finnes ikke i collectionen, legger til bruker nu"
            );
            addNewUser();
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
