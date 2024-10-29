import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app, auth } from "../firebase";
import { getItem, setItem, clearItem } from "../components/localstorage";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(!!getItem("accessToken"));
  const [currentUser, setCurrentUser] = useState(null);

  const Register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LogOut = () => {
    return signOut(auth).then(() => {
      clearItem("username");
      clearItem("accessToken");
      setCurrentUser("");
    });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setItem("username", user?.displayName || user?.email);
        setItem("accessToken", user?.accessToken);
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
    signInWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
