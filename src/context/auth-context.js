import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { getItem, setItem, clearItem } from "../components/localstorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!getItem("user"));
  const [currentUser, setCurrentUser] = useState(null);
  const Register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const LogOut = () => {
    return signOut(auth).then(() => {
      clearItem("user");
    });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setItem(user.email);
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    Register,
    Login,
    isAuth,
    setIsAuth,
    LogOut,
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
