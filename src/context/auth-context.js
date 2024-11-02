import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { setItem, clearItem } from "../components/localstorage";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const AuthContext = createContext();
const githubProvider = new GithubAuthProvider();
const provider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModal, setIsModal] = useState(false);
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
      toast.success("log out successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
      toast.success("log in successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };
  const SignInWithGithub = async () => {
    try {
       await signInWithPopup(auth, githubProvider);
      navigate("/");
      toast.success("Logged in with GitHub successfully", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.includes("google.com")) {
          const credential = GithubAuthProvider.credentialFromError(error);
          const googleCredential = GoogleAuthProvider.credentialFromError(
            error
          );
          try {
            await linkWithCredential(auth.currentUser, googleCredential);
            await linkWithCredential(auth.currentUser, credential);
            setIsAuth(true);
            navigate("/");
          } catch (linkError) {
            console.error("Linking error:", linkError);
          }
        } else {
          toast.error("Account already exists with a different credential", {
            position: "top-right",
            autoClose: 1000,
            theme: "colored",
            transition: Bounce,
          });
        }
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setItem("username", user?.displayName || user?.email);
        setItem("accessToken", user?.accessToken);
        setCurrentUser(user);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return unsubscribe;
  }, []);

  const OpenModal = () => {
    setIsModal(true);
  };
  const CloseModal = () => {
    setIsModal(false);
  };
  const value = {
    Register,
    Login,
    isAuth,
    setIsAuth,
    LogOut,
    currentUser,
    signInWithGoogle,
    SignInWithGithub,
    OpenModal,
    CloseModal,
    isModal,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
